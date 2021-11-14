import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { EnvironmentConfigModule } from './config/environment-config/environment-config.module';
import { TypeOrmConfigModule } from './config/typeorm.module';
import { GraphQLModule } from '@nestjs/graphql';
import graphql_config from './config/graphql.config';
import { AppController } from './app.controller';

@Module({
  imports: [
    GraphQLModule.forRoot(graphql_config),
    EnvironmentConfigModule,
    TypeOrmConfigModule,
    UserModule,
    OrderModule,
    ProductModule,
    CategoryModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
