import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
/**
 *
 *
 * @export
 * @class RedisService
 */
@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}
  /**
   *
   *
   * @param {string} key
   * @param {string} value
   * @return {*}  {Promise<void>}
   * @memberof RedisService
   */
  async setValue(key: string, value: string): Promise<void> {
    await this.cacheManager.set(key, value);
  }
  /**
   *
   *
   * @param {string} key
   * @return {*}  {Promise<string>}
   * @memberof RedisService
   */
  async getValue(key: string): Promise<string> {
    return await this.cacheManager.get<string>(key);
  }
  /**
   *
   *
   * @param {string} key
   * @return {*}  {Promise<void>}
   * @memberof RedisService
   */
  async deleteValue(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }
}
