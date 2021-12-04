import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/user/enums/role.enum';
import { OrderStatus } from './enums/order-status.enum';

@Resolver(() => Order)
export class OrderResolver {
  /**
   * Inject an Order Service
   *
   * parameter: orderService
   */
  constructor(private readonly orderService: OrderService) {}

  /**
   * Create Order
   *
   * parameter: createOrderInput
   * return: Created Order
   */
  @Mutation(() => Order)
  @UseGuards(GqlAuthGuard)
  createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
  ): Promise<Order> {
    return this.orderService.create(createOrderInput);
  }

  /**
   * Show all Orders
   *
   * require: Signed In with Admin Role
   * return: List of Orders
   */
  @Query(() => [Order], { name: 'orders' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  /**
   * Find Order by Id
   *
   * require: Signed In with Admin Role
   * parameter: id
   * return: Order
   */
  @Query(() => Order, { name: 'order' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Order> {
    return this.orderService.findOne(id);
  }

  /**
   * Find Order by User
   *
   * require: Signed In
   * parameter: user
   * return: Order
   */
  @Query(() => [Order], { name: 'orderByUser' })
  @UseGuards(GqlAuthGuard)
  findOrderByUser(@CurrentUser() user: User): Promise<Order[]> {
    return this.orderService.findOrderByUser(user.id);
  }

  /**
   * Update Order Information
   *
   * require: Signed In
   * parameter: updateOrderInput
   * return: Updated Order
   */
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

  /**
   * Remove Order
   *
   * require: Signed In
   * parameter: id
   * return: Success Message
   */
  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  removeOrder(@Args('id', { type: () => Int }) id: number): Promise<string> {
    return this.orderService.remove(id);
  }

  /**
   * Change Order Status
   *
   * require: Signed In with Admin Role
   * parameters: id, status
   * return: Success Message
   */
  @Mutation(() => String)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  changeStatus(
    @Args('id', { type: () => Int }) id: number,
    @Args('status', { type: () => OrderStatus }) status: OrderStatus,
  ): Promise<string> {
    return this.orderService.changeStatus({ id, status });
  }

  /**
   * Upload Receipt to Database
   *
   * require: Signed In
   * parameters: orderId, receiptURL
   * return: Image URL from Database
   */
  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  uploadReceipt(
    @Args('orderId', { type: () => Int }) orderId: number,
    @Args('receiptURL', { type: () => String }) receiptURL: string,
  ): Promise<string> {
    return this.orderService.uploadReceipt(orderId, receiptURL);
  }
}
