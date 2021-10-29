import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeorm_config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'se_project',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};

export default typeorm_config;
