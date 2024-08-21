import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async setValue(key: string, value: string): Promise<void> {
    await this.cacheManager.set(key, value);
  }

  async getValue(key: string): Promise<string> {
    return await this.cacheManager.get<string>(key);
  }

  async deleteValue(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }
}
