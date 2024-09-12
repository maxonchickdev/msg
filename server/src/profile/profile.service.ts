import { Injectable } from '@nestjs/common';
import { AvatarService } from 'src/utils/repositories/avatar/avatar.service';
import { UserService } from 'src/utils/repositories/user/user.service';
import { S3Service } from 'src/utils/s3/s3.service';
import { UserProfileDto } from './dto/user.profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    private readonly usersService: UserService,
    private readonly avatarService: AvatarService,
    private readonly s3Service: S3Service,
  ) {}

  async getUserProfile(userId: string): Promise<UserProfileDto> {
    const user = await this.usersService.findUser({ id: userId });

    const { id, password, isVerified, ...publicInfo } = user;

    return publicInfo;
  }

  async uploadAvatar(id: string, avatar: Express.Multer.File): Promise<string> {
    const user = await this.usersService.findUser({ id: id });
    const userAvatar = await this.avatarService.deleteAvatar(user.avatarId);
    await this.avatarService.deleteAvatar(user.avatarId);
    await this.s3Service.delteFile(userAvatar.key);

    const { url, key } = await this.s3Service.uploadFile(avatar);

    const newAvatar = await this.avatarService.createAvatar({
      url: url,
      key: key,
    });

    user.avatarId = newAvatar.id;

    return newAvatar.url;
  }
}
