import { Injectable } from '@nestjs/common';
import { Avatar, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AvatarService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAvatar(
    avatarWhereUniqueInput: Prisma.AvatarWhereUniqueInput
  ): Promise<Avatar | null> {
    return this.prismaService.avatar.findUnique({
      where: avatarWhereUniqueInput,
    });
  }

  async createAvatar(data: Prisma.AvatarCreateInput): Promise<Avatar> {
    return this.prismaService.avatar.create({
      data,
    });
  }

  async deleteAvatar(id: number) {
    return this.prismaService.avatar.delete({ where: { avatarId: id } });
  }
}
