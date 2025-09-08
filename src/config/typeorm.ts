import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import { registerAs } from '@nestjs/config';
import * as crypto from 'crypto';

// Inyectar crypto al ámbito global antes de que TypeORM lo necesite
(global as any).crypto = crypto;

if (process.env.NODE_ENV !== 'production') {
  dotenvConfig({ path: '.env' });
}

const config: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DB_URL,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: true,
  logging: process.env.NODE_ENV === 'development',
};

export default registerAs('typeorm', () => config);

export const connectionSource = new DataSource(config);

export const initializeDatabase = async () => {
  if (!connectionSource.isInitialized) {
    await connectionSource.initialize();
    console.log('📦 Base de datos conectada');
  }
};