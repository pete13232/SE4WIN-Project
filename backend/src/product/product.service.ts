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
   * Create a product
   *
   * parameter: createProductInput
   * return: a Created product
   */
  async create(createProductInput: CreateProductInput): Promise<Product> {
    //Check if product is already exists 
    const product = await this.productRepository.findOne({
      name: createProductInput.name,
    });
    if (product) {
      throw new ForbiddenError('Product already existed.');
    }

    //Create a new product instance
    const newProduct = this.productRepository.create(createProductInput);

    //Add category relation
    const category = await this.categoryRepository.findOne({
      where: { id: createProductInput.categoryId },
      relations: ['product'],
    });
    //Throw error if not found a category
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
   * Show all products
   *
   * returnL: List of products
   */
  async findAll(): Promise<Product[]> {
    //Find proudct
    const products = await this.productRepository.find({
      relations: ['category', 'order'],
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
   * parameters: id
   * return: Product
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
   * Update a Product Information
   *
   * parameters: id, updateProductInput
   * return: The Updated Product
   */
  async update(
    id: number,
    updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    //Find a product
    const product = this.findOne(id);

    //Copy update infomation to current infomation
    const updated = Object.assign(product, updateProductInput);

    //Save to database
    return await this.productRepository.save(updated);
  }

  /**
   * Remove a product
   *
   * parameters: id
   * return: a Success Message
   */
  async remove(id: number): Promise<string> {
    //Find a product
    this.findOne(id);

    //Delete product in database
    await this.productRepository.delete(id);

    return 'Delete success!';
  }

  /**
   * Count Quantity of a Product in Stock
   *
   * parameters: id
   * return: Quantity of a Product in Stock
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

    //Map to all order found and count their quantity
    orders.map((product) => {
      stock += product.quantity;
    });

    return stock;
  }

  /**
   * Update Quantity of a Product in Stock
   *
   * parameters: user ,productId ,quantity
   * return: The Updated Quantity in Stock
   */
  async updateStock(
    userId: number,
    productId: number,
    quantity: number,
  ): Promise<number> {
    //Create a new order to add a product quantity to stock
    const createOrderInput = new CreateOrderInput();
    createOrderInput.userId = userId;
    createOrderInput.productId = productId;
    createOrderInput.quantity = quantity;
    await this.orderService.create(createOrderInput);

    //Check if the stock updated correctly
    return this.countStock(productId);
  }
}
