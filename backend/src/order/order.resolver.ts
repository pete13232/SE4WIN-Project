import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { Order, Order_Status } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation(() => Order)
  createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
  ): Promise<Order> {
    return this.orderService.create(createOrderInput);
  }

  @Query(() => [Order], { name: 'orders' })
  findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Query(() => Order, { name: 'order' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Order> {
    return this.orderService.findOne(id);
  }
  @Query(() => [Order], { name: 'orderByUser' })
  findByUser(@Args('id', { type: () => Int }) id: number): Promise<Order[]> {
    return this.orderService.findByUser(id);
  }

  @Mutation(() => Order)
  updateOrder(
    @Args('updateOrderInput') updateOrderInput: UpdateOrderInput,
  ): Promise<Order> {
    return this.orderService.update({
      id: updateOrderInput.id,
      updateOrderInput,
    });
  }

  @Mutation(() => String)
  removeOrder(@Args('id', { type: () => Int }) id: number): Promise<string> {
    return this.orderService.remove(id);
  }

  @Mutation(() => String)
  changeSatus(
    @Args('id', { type: () => Int }) id: number,
    @Args('status', { type: () => Order_Status }) status: Order_Status,
  ): Promise<string> {
    return this.orderService.changeStatus({ id, status });
  }
}
