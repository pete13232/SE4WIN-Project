import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import graphql_config from './config/graphql.config';
import typeorm_config from './config/orm.config';

@Module({
  imports: [
    GraphQLModule.forRoot(graphql_config),
    TypeOrmModule.forRoot(typeorm_config),
    UserModule,
    OrderModule,
    ProductModule,
    CategoryModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
