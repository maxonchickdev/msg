import { Injectable } from '@nestjs/common'
import { AvatarService } from '../utils/repositories/avatar/avatar.service'
import { UserService } from '../utils/repositories/user/user.service'
import { S3Service } from '../utils/s3/s3.service'
import { UserProfileDto } from './dto/user.profile.dto'

@Injectable()
export class ProfileService {
  constructor(
    private readonly usersService: UserService,
    private readonly avatarService: AvatarService,
    private readonly s3Service: S3Service
  ) {}

  async getUserProfile(id: string): Promise<UserProfileDto> {
    const user = await this.usersService.findUserById(id)

    return {
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }

  async uploadAvatar(
    userId: string,
    avatar: Express.Multer.File
  ): Promise<string> {
    const user = await this.usersService.findUserById(userId)
    // const userAvatar = await this.avatarService.deleteAvatar(user.);
    // await this.avatarService.deleteAvatar(user.avatarId);
    // await this.s3Service.delteFile(userAvatar.key);

    // const { url, key } = await this.s3Service.uploadFile(avatar);

    // const newAvatar = await this.avatarService.createAvatar({
    //   url: url,
    //   key: key,
    // });

    // user.avatarId = newAvatar.id;

    return ''
  }
}
