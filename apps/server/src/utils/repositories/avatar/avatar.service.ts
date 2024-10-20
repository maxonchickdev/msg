import { Injectable } from '@nestjs/common';
import { Avatar, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
/**
 *
 *
 * @export
 * @class AvatarService
 */
@Injectable()
export class AvatarService {
  /**
   * Creates an instance of AvatarService.
   * @param {PrismaService} prismaService
   * @memberof AvatarService
   */
  constructor(private readonly prismaService: PrismaService) {}
  /**
   *
   *
   * @param {Prisma.AvatarWhereUniqueInput} avatarWhereUniqueInput
   * @return {*}  {(Promise<Avatar | null>)}
   * @memberof AvatarService
   */
  async findAvatar(
    avatarWhereUniqueInput: Prisma.AvatarWhereUniqueInput
  ): Promise<Avatar | null> {
    return this.prismaService.avatar.findUnique({
      where: avatarWhereUniqueInput,
    });
  }
  /**
   *
   *
   * @param {Prisma.AvatarCreateInput} data
   * @return {*}  {Promise<Avatar>}
   * @memberof AvatarService
   */
  async createAvatar(data: Prisma.AvatarCreateInput): Promise<Avatar> {
    return this.prismaService.avatar.create({
      data,
    });
  }
  /**
   *
   *
   * @param {number} id
   * @return {*}
   * @memberof AvatarService
   */
  async deleteAvatar(id: number) {
    return this.prismaService.avatar.delete({ where: { avatarId: id } });
  }
}
