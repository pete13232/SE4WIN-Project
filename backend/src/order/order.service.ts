import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ForbiddenError } from 'apollo-server-errors';
import { Repository } from 'typeorm';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async create(createOrderInput: CreateOrderInput): Promise<Order> {
    const newOrder = this.orderRepository.create(createOrderInput);
    return this.orderRepository.save(newOrder);
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async findOne(id: number): Promise<Order> {
    return this.orderRepository.findOneOrFail(id);
  }

  async update(id: number, updateOrderInput: UpdateOrderInput): Promise<Order> {
    const order = await this.orderRepository.findOne(id);
    if (!order) {
      throw new ForbiddenError('Order does not existed.');
    }
    const updatedOrder = Object.assign(order, updateOrderInput);
    return this.orderRepository.save(updatedOrder);
  }

  async remove(id: number): Promise<string> {
    await this.orderRepository.delete(id);
    return 'Delete success';
  }
}
