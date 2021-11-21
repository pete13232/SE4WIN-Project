import { registerEnumType } from '@nestjs/graphql';

export enum Order_Status {
  AWAITING = 'awaiting',
  PENDING = 'pending',
  SUCCESS = 'success',
  FAIL = 'fail',
}

registerEnumType(Order_Status, {
  name: 'Order_Status',
});
