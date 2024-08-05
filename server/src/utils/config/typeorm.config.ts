import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config({ path: `${process.env.NODE_ENV}.env` });

console.log(process.env.MYSQL_HOST, process.env.NODE_ENV);

const typeormConfig = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_LOCAL_PORT, 10) || 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: ['dist/utils/entities/*.entity.js'],
  migrations: ['dist/utils/migrations/*.js'],
  synchronize: false,
  autoLoadEntities: true,
  migrationsRun: true,
};

export default registerAs('typeorm', () => typeormConfig);
export const connectionSource = new DataSource(
  typeormConfig as DataSourceOptions,
);
