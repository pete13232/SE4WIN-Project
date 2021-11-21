import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
}

registerEnumType(Role, {
  name: 'Role',
});
