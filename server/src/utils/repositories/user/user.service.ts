import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { PrismaService } from 'src/utils/prisma/prisma.service';

dotenv.config({ path: `${process.env.NODE_ENV}.env` });

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: userWhereUniqueInput,
      include: {
        profileImage: true,
      },
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prismaService.user.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prismaService.user.update({
      data,
      where,
    });
  }

  async setCurrntRefreshToken(
    refreshToken: string,
    userId: string,
  ): Promise<User> {
    const currentHashRefreshToken = await bcrypt.hash(
      refreshToken,
      parseInt(process.env.SALT_OR_ROUNDS, 10),
    );
    return await this.updateUser({
      where: { id: userId },
      data: { currentHashedRefreshToken: currentHashRefreshToken },
    });
  }

  async getUserIfRefreshTokenMatches(
    refreshToken: string,
    userId: string,
  ): Promise<User> {
    const user = await this.findUser({ id: userId });

    const refreshTokensMatch = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );

    if (refreshTokensMatch) return user;
  }
}
