import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
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

  async getUserProfile(email: string): Promise<UserProfileDto> {
    const user = await this.usersService.findUser({ email: email });

    const { id, password, isVerified, ...publicInfo } = user;

    return publicInfo;
  }

  async uploadAvatar(
    email: string,
    dataBuffer: Buffer,
    filename: string,
  ): Promise<Prisma.AvatarCreateInput> {
    const user = await this.usersService.findUser({ email: email });
    const avatar = await this.avatarService.deleteAvatar(user.avatarId);
    await this.avatarService.deleteAvatar(user.avatarId);
    await this.s3Service.delete(avatar.key);

    const uploadResults = await this.s3Service.upload(dataBuffer, filename);

    const newAvatar = await this.avatarService.createAvatar({
      url: uploadResults.Location,
      key: uploadResults.Key,
    });

    user.avatarId = newAvatar.id;

    return newAvatar;
  }
}
