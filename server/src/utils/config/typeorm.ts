import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

const typeormConfig = {
  type: 'mysql',
  host: `${process.env.MYSQL_HOST}`,
  port: parseInt(`${process.env.MYSQL_LOCAL_PORT}`, 10) || 3306,
  username: `${process.env.MYSQL_USER}`,
  password: `${process.env.MYSQL_PASSWORD}`,
  database: `${process.env.MYSQL_DATABASE}`,
  entities: ['dist/entities/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
  autoLoadEntities: true,
  migrationsRun: true,
};

export default registerAs('typeorm', () => typeormConfig);
export const connectionSource = new DataSource(
  typeormConfig as DataSourceOptions,
);
