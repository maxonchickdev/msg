import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { RedisService } from './redis.service';

dotenv.config({ path: `${process.env.NODE_ENV}.env` });

@Module({
  imports: [
    CacheModule.register({
      ttl: parseInt(process.env.REDIS_TTL) || 60000,
      max: parseInt(process.env.REDIS_MAX) || 100,
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
