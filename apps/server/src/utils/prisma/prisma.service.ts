import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
/**
 *
 *
 * @export
 * @class PrismaService
 * @extends {PrismaClient}
 * @implements {OnModuleInit}
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  /**
   *
   *
   * @return {*}  {Promise<void>}
   * @memberof PrismaService
   */
  async onModuleInit(): Promise<void> {
    await this.$connect();
  }
}
