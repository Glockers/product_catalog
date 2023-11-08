import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Order } from '../src/orders/entities/order.entity';

dotenvConfig({ path: './apps/order/.env' });

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: `${process.env.TYPEORM_HOST}`,
  port: Number(`${process.env.TYPEORM_PORT}`),
  username: `${process.env.TYPEORM_USERNAME}`,
  password: `${process.env.TYPEORM_PASSWORD}`,
  database: `${process.env.TYPEORM_DATABASE}`,
  entities: [Order],
  migrations: [],
  synchronize: true
};

const dataSourse = new DataSource(dataSourceOptions as DataSourceOptions);

export default dataSourse;
