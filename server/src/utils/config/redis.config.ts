import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import * as dotenv from 'dotenv';

dotenv.config({ path: `${process.env.NODE_ENV}.env` });

export const RedisOptions: CacheModuleAsyncOptions = {
  useFactory: async () => {
    const store = await redisStore({
      socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_LOCAL_PORT, 10),
      },
      ttl: 5,
    });
    return {
      store: () => store,
    };
  },
};
