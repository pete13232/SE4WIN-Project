import { registerEnumType } from '@nestjs/graphql';

export enum OrderStatus {
  AWAITING = 'awaiting',
  PENDING = 'pending',
  SUCCESS = 'success',
  FAIL = 'fail',
}

registerEnumType(OrderStatus, {
  name: 'OrderStatus',
});
