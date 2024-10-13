import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Prisma, User } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService
  ) {}

  async findUserById(id: string): Promise<User> {
    return await this.prismaService.user.findUnique({
      where: { userId: id },
    })
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.prismaService.user.findUnique({
      where: { email },
    })
  }

  async findUserByUsername(username: string): Promise<User> {
    return await this.prismaService.user.findUnique({
      where: { username },
    })
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prismaService.user.create({
      data,
    })
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput
    data: Prisma.UserUpdateInput
  }): Promise<User> {
    const { where, data } = params
    return this.prismaService.user.update({
      data,
      where,
    })
  }

  async setCurrntRefreshToken(
    refreshToken: string,
    userId: string
  ): Promise<User> {
    const currentHashRefreshToken = await bcrypt.hash(
      refreshToken,
      this.configService.get<number>('hash.salt')
    )
    return await this.updateUser({
      where: { userId: userId },
      data: { currentHashedRefreshToken: currentHashRefreshToken },
    })
  }

  async getUserIfRefreshTokenMatches(
    refreshToken: string,
    userId: string
  ): Promise<User> {
    const user = await this.findUserById(userId)

    const refreshTokensMatch = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken
    )

    if (refreshTokensMatch) return user
  }
}
