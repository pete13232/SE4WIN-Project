import { ObjectType } from '@nestjs/graphql';
import { Paginated } from 'src/pagination/pagination';
import { Category } from '../entities/category.entity';

@ObjectType()
export class PaginatedCategory extends Paginated(Category) {}
