import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { EnvironmentConfigModule } from './config/environment-config/environment-config.module';
import { TypeOrmConfigModule } from './config/typeorm.module';
import { AppController } from './app.controller';
import { GqlConfigModule } from './config/gql-config/gql.module';

@Module({
  imports: [
    GqlConfigModule,
    EnvironmentConfigModule,
    TypeOrmConfigModule,
    UserModule,
    OrderModule,
    ProductModule,
    CategoryModule,
    AuthModule,
    DefaultModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
