import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ForbiddenError } from 'apollo-server-errors';
import { Category } from 'src/category/entities/category.entity';
import { CreateOrderInput } from 'src/order/dto/create-order.input';
import { Order } from 'src/order/entities/order.entity';
import { OrderService } from 'src/order/order.service';
import { Repository } from 'typeorm';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';

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
   * Create product
   *
   * @param createProductInput
   * @returns Created product
   */
  async create(createProductInput: CreateProductInput): Promise<Product> {
    //Check exist product name
    const product = await this.productRepository.findOne({
      name: createProductInput.name,
    });
    if (product) {
      throw new ForbiddenError('Product already existed.');
    }

    //Create new product instance
    const newProduct = this.productRepository.create(createProductInput);

    //Add category relation
    const category = await this.categoryRepository.findOne({
      where: { id: createProductInput.categoryId },
      relations: ['product'],
    });
    if (!category) {
      throw new ForbiddenError('Category not found');
    }
    category.product.push(newProduct);

    //Save to db
    await this.productRepository.save(newProduct);
    await this.categoryRepository.save(category);

    return newProduct;
  }

  /**
   * Show all product
   *
   * @returns List of product
   */
  async findAll(): Promise<Product[]> {
    //Find proudct
    const products = await this.productRepository.find({
      relations: ['category', 'order'],
    });
    //Throw error if not found any
    if (!products) {
      throw new ForbiddenError('Product not found');
    }
    return products;
  }

  /**
   * Find user by id
   *
   * @param id
   * @returns Product
   */
  async findOne(id: number): Promise<Product> {
    //count latest stock of product
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
   * Update product information
   *
   * @param id
   * @param updateProductInput
   * @returns updated product
   */
  async update(
    id: number,
    updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    //Find product
    const product = this.findOne(id);

    //Copy update info to current info
    const updated = Object.assign(product, updateProductInput);

    //Save to db
    return await this.productRepository.save(updated);
  }

  /**
   * Remove product
   *
   * @param id
   * @returns success message
   */
  async remove(id: number): Promise<string> {
    //Find product
    this.findOne(id);

    //Delete product in db
    await this.productRepository.delete(id);

    return 'Delete success!';
  }

  /**
   * Count quantity of product left in stock
   *
   * @param id
   * @returns number of stock
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

    //map to all order found and count their quantity
    orders.map((product) => {
      stock += product.quantity;
    });

    return stock;
  }

  async updateStock(
    userId: number,
    productId: number,
    quantity: number,
  ): Promise<number> {
    const createOrderInput = new CreateOrderInput();
    createOrderInput.userId = userId;
    createOrderInput.productId = productId;
    createOrderInput.quantity = quantity;
    await this.orderService.create(createOrderInput);

    return this.countStock(productId);
  }
}
