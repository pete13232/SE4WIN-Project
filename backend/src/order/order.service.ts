import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ForbiddenError } from 'apollo-server-errors';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order } from './entities/order.entity';
import { Order_Status } from './enums/order-status.enum';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createOrderInput: CreateOrderInput): Promise<Order> {
    const newOrder = this.orderRepository.create(createOrderInput);

    //Add user
    const user = await this.userRepository.findOne({
      where: { id: createOrderInput.userId },
      relations: ['order'],
    });
    if (!user) {
      throw new ForbiddenError('User not found');
    }

    //check address
    if (createOrderInput.orderAddress == null) {
      newOrder.orderAddress = user.address;
    }

    user.order.push(newOrder);

    //Add product
    const product = await this.productRepository.findOne({
      where: { id: createOrderInput.productId },
      relations: ['order'],
    });
    if (!product) {
      throw new ForbiddenError('Product not found');
    }
    product.order.push(newOrder);

    //Calculate total price
    newOrder.netPrice = product.price * createOrderInput.quantity;

    //save Order first
    await this.orderRepository.save(newOrder);
    await this.productRepository.save(product);
    await this.userRepository.save(user);

    return newOrder;
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find({
      relations: ['user', 'product'],
    });
  }

  async findOne(id: number): Promise<Order> {
    return await this.orderRepository.findOneOrFail({
      where: { id: id },
      relations: ['user', 'product'],
    });
  }
  async findByUser(id: number): Promise<Order[]> {
    // const user = await this.userRepository.findOneOrFail(id);
    const orders = await this.orderRepository.find({
      where: { user: id },
      relations: ['user', 'product'],
    });

    if (!orders) {
      throw new ForbiddenError('There is no order yet.');
    }
    return orders;
  }

  async update({
    id,
    updateOrderInput,
  }: {
    id: number;
    updateOrderInput: UpdateOrderInput;
  }): Promise<Order> {
    const order = await this.orderRepository.findOne(id);

    if (!order) {
      throw new ForbiddenError('Order does not existed.');
    }
    const updatedOrder = Object.assign(order, updateOrderInput);

    return await this.orderRepository.save(updatedOrder);
  }

  async remove(id: number): Promise<string> {
    const order = await this.orderRepository.findOneOrFail(id);
    if (!order) {
      throw new ForbiddenError('Order not found');
    }

    await this.orderRepository.delete(id);
    return 'Delete success';
  }

  async changeStatus({
    id,
    status,
  }: {
    id: number;
    status: Order_Status;
  }): Promise<string> {
    const order = await this.orderRepository.findOneOrFail(id);

    if (!order) {
      throw new ForbiddenError('Order not found');
    }

    const oldStatus = order.status;

    order.status = status;
    await this.orderRepository.save(order);

    return `Order status id ${id} change from ${oldStatus} to ${order.status}`;
  }

  async uploadReceipt(orderId: number, imageURL: string): Promise<string> {
    const order = await this.findOne(orderId);

    if (!order) {
      throw new ForbiddenError('Order not found');
    }

    order.receiptURL = imageURL;

    await this.orderRepository.save(order);

    return order.receiptURL;
  }
}
