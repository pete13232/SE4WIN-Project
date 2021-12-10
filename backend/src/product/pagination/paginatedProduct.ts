import { ObjectType } from '@nestjs/graphql';
import { Paginated } from 'src/pagination/pagination';
import { Product } from 'src/product/entities/product.entity';

@ObjectType()
export class PaginatedProduct extends Paginated(Product) {}
