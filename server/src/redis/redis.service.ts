import { Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async setValue(key: string, value: string) {
    await this.cacheManager.set(key, value);
  }

  async getValue(key: string): Promise<string> {
    return await this.cacheManager.get<string>(key);
  }

  async deleteValue(key: string) {
    await this.cacheManager.del(key);
  }
}
