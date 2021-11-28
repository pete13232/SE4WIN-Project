import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order_Status } from './enums/order-status.enum';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/user/enums/role.enum';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  /**
   *
   * @param createOrderInput
   * @returns Created order
   */
  @Mutation(() => Order)
  @UseGuards(GqlAuthGuard)
  createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
  ): Promise<Order> {
    return this.orderService.create(createOrderInput);
  }

  @Query(() => [Order], { name: 'orders' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Query(() => Order, { name: 'order' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Order> {
    return this.orderService.findOne(id);
  }

  @Query(() => [Order], { name: 'orderByUser' })
  @UseGuards(GqlAuthGuard)
  findByUser(@CurrentUser() user: User): Promise<Order[]> {
    return this.orderService.findByUser(user.id);
  }

  @Mutation(() => Order)
  @UseGuards(GqlAuthGuard)
  updateOrder(
    @Args('updateOrderInput') updateOrderInput: UpdateOrderInput,
  ): Promise<Order> {
    return this.orderService.update({
      id: updateOrderInput.id,
      updateOrderInput,
    });
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  removeOrder(@Args('id', { type: () => Int }) id: number): Promise<string> {
    return this.orderService.remove(id);
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  changeStatus(
    @Args('id', { type: () => Int }) id: number,
    @Args('status', { type: () => Order_Status }) status: Order_Status,
  ): Promise<string> {
    return this.orderService.changeStatus({ id, status });
  }

  /**
   * TODO findByName
   * @param productName
   * @returns lsit of product
   */
}
