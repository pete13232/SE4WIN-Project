import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ForbiddenError } from 'apollo-server-errors';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order } from './entities/order.entity';
import { OrderStatus } from './enums/order-status.enum';

@Injectable()
export class OrderService {
  /**
   *
   * Inject to database repository
   *
   */
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * Create Order
   *
   * parameter: createOrderInput
   * return: Created Order
   */
  async create(createOrderInput: CreateOrderInput): Promise<Order> {

    //Create new order instance
    const newOrder = this.orderRepository.create(createOrderInput);

    //Add user relation
    const user = await this.userRepository.findOne({
      where: { id: createOrderInput.userId },
      relations: ['order'],
    });
    //Throw error if not found user
    if (!user) {
      throw new ForbiddenError('User not found');
    }

    //Check shipping address
    if (createOrderInput.orderAddress == null) {
      newOrder.orderAddress = user.address;
    }

    user.order.push(newOrder);

    //Add product relation
    const product = await this.productRepository.findOne({
      where: { id: createOrderInput.productId },
      relations: ['order'],
    });
    //Throw error if not found product
    if (!product) {
      throw new ForbiddenError('Product not found');
    }
    product.order.push(newOrder);

    //Calculate the total price
    newOrder.netPrice = product.price * createOrderInput.quantity;

    //Save to database
    await this.orderRepository.save(newOrder);
    await this.productRepository.save(product);
    await this.userRepository.save(user);

    return newOrder;
  }

  /**
   * Show All Orders
   *
   * return: List of Orders
   */
  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find({
      relations: ['user', 'product'],
      order: { updatedAt: 'DESC', createdAt: 'DESC' },
    });
  }

  /**
   * Find Order by Id
   *
   * parameter: id
   * return: Order
   */
  async findOne(id: number): Promise<Order> {
    return await this.orderRepository.findOneOrFail({
      where: { id: id },
      relations: ['user', 'product'],
    });
  }

  /**
   * Find Order by User
   *
   * parameter: user
   * return: Order
   */
  async findOrderByUser(id: number): Promise<Order[]> {

    //Find order by user
    const orders = await this.orderRepository.find({
      where: { user: id },
      relations: ['user', 'product'],
      order: {
        updatedAt: 'DESC',
        createdAt: 'DESC',
      },
    });

    //Throw error if not found
    if (!orders) {
      throw new ForbiddenError('There is no order yet.');
    }
    return orders;
  }

  /**
   * Update Order Information
   *
   * parameters: id, updateOrderInput
   * return: Updated Order
   */
  async update({
    id,
    updateOrderInput,
  }: {
    id: number;
    updateOrderInput: UpdateOrderInput;
  }): Promise<Order> {

    //Find order
    const order = await this.orderRepository.findOne(id);

    //Throw error if not found
    if (!order) {
      throw new ForbiddenError('Order does not existed.');
    }
    //Copy update infomation to current infomation
    const updatedOrder = Object.assign(order, updateOrderInput);

    //Save to database
    return await this.orderRepository.save(updatedOrder);
  }

  /**
   * Remove Order
   *
   * parameter: id
   * return: Success Message
   */
  async remove(id: number): Promise<string> {

    //Find order
    const order = await this.orderRepository.findOneOrFail(id);

    //Throw error if not found
    if (!order) {
      throw new ForbiddenError('Order not found');
    }

    //Delete order in database
    await this.orderRepository.delete(id);
    return 'Delete success';
  }

  /**
   * Change Order Status
   *
   * parameters: id, status
   * return: Success Message
   */
  async changeStatus({
    id,
    status,
  }: {
    id: number;
    status: OrderStatus;
  }): Promise<string> {

    //Find order
    const order = await this.orderRepository.findOneOrFail(id);

    //Throw error if not found
    if (!order) {
      throw new ForbiddenError('Order not found');
    }

    //Change order status
    const oldStatus = order.status;
    order.status = status;
    await this.orderRepository.save(order);

    return `Order status id ${id} change from ${oldStatus} to ${order.status}`;
  }

  /**
   * Upload Receipt to Database
   *
   * parameters: orderId, receiptURL
   * return: Image URL from Database
   */
  async uploadReceipt(orderId: number, imageURL: string): Promise<string> {

    //Find order
    const order = await this.findOne(orderId);

    //Throw error if not found
    if (!order) {
      throw new ForbiddenError('Order not found');
    }

    //Change receipt URL
    order.receiptURL = imageURL;

    //Change order status to Pending
    order.status = OrderStatus.PENDING;

    //Save to database
    await this.orderRepository.save(order);
    return order.receiptURL;
  }
}
