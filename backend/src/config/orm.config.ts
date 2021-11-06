import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeorm_config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: 'se_project',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};

export default typeorm_config;
