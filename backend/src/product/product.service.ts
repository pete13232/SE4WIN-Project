import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ForbiddenError } from 'apollo-server-errors';
import { Category } from 'src/category/entities/category.entity';
import { CreateOrderInput } from 'src/order/dto/create-order.input';
import { Order } from 'src/order/entities/order.entity';
import { OrderService } from 'src/order/order.service';
import { Like, Repository } from 'typeorm';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';
import { PaginatedProduct } from './pagination/paginatedProduct';

@Injectable()
export class ProductService {
  /**
   *
   * Inject to database repository
   *
   */
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @Inject(forwardRef(() => OrderService))
    private readonly orderService: OrderService,
  ) {}

  /**
   * Create Product
   *
   * parameter: createProductInput
   * return: Created product
   */
  async create(createProductInput: CreateProductInput): Promise<Product> {
    //Check if product is already exists
    const product = await this.productRepository.findOne({
      where: { name: createProductInput.name },
    });

    //Throw error if not found products
    if (product) {
      throw new ForbiddenError('Product already existed');
    }
    //Create new product instance
    const newProduct = this.productRepository.create(createProductInput);

    //Add category relation
    const category = await this.categoryRepository.findOne({
      where: { id: createProductInput.categoryId },
      relations: ['product'],
    });

    //Throw error if not found category
    if (!category) {
      throw new ForbiddenError('Category not found');
    }
    category.product.push(newProduct);

    //Save to database
    await this.productRepository.save(newProduct);
    await this.categoryRepository.save(category);

    return newProduct;
  }

  /**
   * Show All Products
   *
   * parameter: page, number
   * return: List of Products
   */
  async findAll(page: number, sort: number): Promise<PaginatedProduct> {
    const limit = 12;
    const offset = (page - 1) * limit;
    //Find proudct
    const products = await this.productRepository.findAndCount({
      relations: ['category', 'order'],
      order: {
        price: sort ? 'ASC' : 'DESC',
        updatedAt: 'DESC',
        createdAt: 'DESC',
      },
      skip: offset,
      take: limit,
    });

    //Throw error if not found products
    if (!products) {
      throw new ForbiddenError('Product not found');
    }

    const paginated = new PaginatedProduct();
    paginated.data = products[0];
    paginated.totalCount = products[1];
    paginated.hasNextPage = this.checkNextPage(
      paginated.totalCount,
      offset,
      limit,
    );

    return paginated;
  }

  /**
   * Show All Products
   *
   * return: List of Products
   */
  async AdminFindAll(): Promise<Product[]> {
    //Find proudct
    const products = await this.productRepository.find({
      relations: ['category', 'order'],
      order: {
        id: 'ASC',
        updatedAt: 'DESC',
        createdAt: 'DESC',
      },
    });

    //Throw error if not found products
    if (!products) {
      throw new ForbiddenError('Product not found');
    }

    return products;
  }

  /**
   * Find Product by Id
   *
   * parameter: id
   * return: Product
   */
  async findOne(id: number): Promise<Product> {
    //Count latest stock of product
    this.countStock(id);

    //Find proudct by id
    const product = await this.productRepository.findOne({
      where: { id: id },
      relations: ['category', 'order'],
    });

    //Throw error if not found
    if (!product) {
      throw new ForbiddenError('Product not found');
    }

    return product;
  }

  /**
   * Find Product by Name
   *
   * parameter: name
   * return: Product
   */
  async findByName(
    name: string,
    page: number,
    sort: number,
  ): Promise<PaginatedProduct> {
    const limit = 12;
    const offset = (page - 1) * limit;
    //Find proudct by name
    const products = await this.productRepository.findAndCount({
      where: { name: Like('%' + name + '%') },
      relations: ['category', 'order'],
      order: { price: sort ? 'ASC' : 'DESC', name: 'ASC' },
      skip: offset,
      take: limit,
    });

    //Throw error if not found
    if (!products) {
      throw new ForbiddenError('Product not found');
    }

    const paginated = new PaginatedProduct();
    paginated.data = products[0];
    paginated.totalCount = products[1];
    paginated.hasNextPage = this.checkNextPage(
      paginated.totalCount,
      offset,
      limit,
    );
    // console.log(paginated.totalCount % (offset + limit));

    return paginated;
  }

  /**
   * Find Product by category
   *
   * parameter: categoryId
   * return:List of Product
   */
  async findProductByCategory(
    categoryId: number,
    page: number,
    sort: number,
  ): Promise<PaginatedProduct> {
    const limit = 12;
    const offset = (page - 1) * limit;
    //Find proudct by category
    const products = await this.productRepository.findAndCount({
      where: { category: categoryId },
      relations: ['category', 'order'],
      order: { price: sort ? 'ASC' : 'DESC', name: 'ASC' },
      skip: offset,
      take: limit,
    });

    //Throw error if not found
    if (!products) {
      throw new ForbiddenError('Product not found');
    }
    const paginated = new PaginatedProduct();
    paginated.data = products[0];
    paginated.totalCount = products[1];
    paginated.hasNextPage = this.checkNextPage(
      paginated.totalCount,
      offset,
      limit,
    );

    return paginated;
  }

  /**
   * Update Product Information
   *
   * parameters: id, updateProductInput
   * return: Updated Product
   */
  async update(
    id: number,
    updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    //Find product
    const product = this.findOne(id);

    //Copy update infomation to current infomation
    const updated = Object.assign(product, updateProductInput);

    //Save to database
    return await this.productRepository.save(updated);
  }

  /**
   * Remove Product
   *
   * parameter: id
   * return: Success Message
   */
  async remove(id: number): Promise<string> {
    //Find a product
    this.findOne(id);

    //Delete product in database
    await this.productRepository.delete(id);
    return 'Delete success!';
  }

  /**
   * Count Quantity of Product in Stock
   *
   * parameter: id
   * return: Quantity of Product in Stock
   */
  async countStock(id: number): Promise<number> {
    let stock = 0;

    //Find order by product id
    const orders = await this.orderRepository.find({
      select: ['quantity'],
      where: { product: id },
    });
    if (!orders) {
      throw new ForbiddenError('Product not found');
    }

    //Map to all order found and count quantity
    orders.map((product) => {
      stock += product.quantity;
    });

    return stock;
  }

  /**
   * Update Quantity of Product in Stock
   *
   * parameterss: userId ,productId ,quantity
   * return: Updated Quantity in Stock
   */
  async updateStock(
    userId: number,
    productId: number,
    quantity: number,
  ): Promise<number> {
    //Create new a order to add the quantity to stock
    const createOrderInput = new CreateOrderInput();
    createOrderInput.userId = userId;
    createOrderInput.productId = productId;
    createOrderInput.quantity = quantity;
    await this.orderService.create(createOrderInput);

    //Check if the stock updated correctly
    return this.countStock(productId);
  }

  async countProduct() {
    return await this.productRepository.count();
  }

  checkNextPage(count: number, offset: number, limit: number): boolean {
    return offset == 0 ? count > 6 : count % (offset + limit) < count;
  }
}
