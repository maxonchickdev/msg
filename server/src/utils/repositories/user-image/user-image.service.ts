import { Injectable } from '@nestjs/common';
import { Image, Prisma } from '@prisma/client';
import { PrismaService } from 'src/utils/prisma/prisma.service';

@Injectable()
export class UserImageService {
  constructor(private readonly prismaService: PrismaService) {}

  async findImage(
    imageWhereUniqueInput: Prisma.ImageWhereUniqueInput,
  ): Promise<Image | null> {
    return this.prismaService.image.findUnique({
      where: imageWhereUniqueInput,
    });
  }

  async createImage(data: Prisma.ImageCreateInput): Promise<Image> {
    return this.prismaService.image.create({
      data,
    });
  }
}
