import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from '../src/users/entities/user.entity';
import { AuthSession } from '../src/auth/entities/auth.entity';

dotenvConfig({ path: './apps/users/.env' });

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: `${process.env.TYPEORM_HOST}`,
  port: Number(`${process.env.TYPEORM_PORT}`),
  username: `${process.env.TYPEORM_USERNAME}`,
  password: `${process.env.TYPEORM_PASSWORD}`,
  database: `${process.env.TYPEORM_DATABASE}`,
  entities: [User, AuthSession],
  migrations: [],
  synchronize: true
};

const dataSourse = new DataSource(dataSourceOptions as DataSourceOptions);

export default dataSourse;
