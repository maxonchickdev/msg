import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
/**
 *
 *
 * @export
 * @class UserService
 */
@Injectable()
export class UserService {
  /**
   * Creates an instance of UserService.
   * @param {PrismaService} prismaService
   * @param {ConfigService} configService
   * @memberof UserService
   */
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService
  ) {}
  /**
   *
   *
   * @param {string} id
   * @return {*}  {Promise<User>}
   * @memberof UserService
   */
  async findUserById(id: string): Promise<User> {
    return await this.prismaService.user.findUnique({
      where: { userId: id },
    });
  }
  /**
   *
   *
   * @param {string} email
   * @return {*}  {Promise<User>}
   * @memberof UserService
   */
  async findUserByEmail(email: string): Promise<User> {
    return await this.prismaService.user.findUnique({
      where: { email },
    });
  }
  /**
   *
   *
   * @param {string} username
   * @return {*}  {Promise<User>}
   * @memberof UserService
   */
  async findUserByUsername(username: string): Promise<User> {
    return await this.prismaService.user.findUnique({
      where: { username },
    });
  }
  /**
   *
   *
   * @param {Prisma.UserCreateInput} data
   * @return {*}  {Promise<User>}
   * @memberof UserService
   */
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prismaService.user.create({
      data,
    });
  }
  /**
   *
   *
   * @param {{
   *     where: Prisma.UserWhereUniqueInput;
   *     data: Prisma.UserUpdateInput;
   *   }} params
   * @return {*}  {Promise<User>}
   * @memberof UserService
   */
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
  /**
   *
   *
   * @param {string} refreshToken
   * @param {string} userId
   * @return {*}  {Promise<User>}
   * @memberof UserService
   */
  async setCurrntRefreshToken(
    refreshToken: string,
    userId: string
  ): Promise<User> {
    const currentHashRefreshToken = await bcrypt.hash(
      refreshToken,
      this.configService.get<number>('hash.salt')
    );
    return await this.updateUser({
      where: { userId: userId },
      data: { currentHashedRefreshToken: currentHashRefreshToken },
    });
  }
  /**
   *
   *
   * @param {string} refreshToken
   * @param {string} userId
   * @return {*}  {Promise<User>}
   * @memberof UserService
   */
  async getUserIfRefreshTokenMatches(
    refreshToken: string,
    userId: string
  ): Promise<User> {
    const user = await this.findUserById(userId);

    const refreshTokensMatch = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken
    );

    if (refreshTokensMatch) return user;
  }
}
