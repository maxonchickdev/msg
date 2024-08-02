import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisOptions } from 'src/utils/constants/constants';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.registerAsync(RedisOptions)],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
