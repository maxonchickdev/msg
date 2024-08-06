import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/repositories/users/users.service';
import { UserProfileDto } from 'src/utils/dto/profile.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly usersService: UsersService) {}

  async getUserProfile(uuid: string): Promise<UserProfileDto> {
    const user = await this.usersService.findByUuid(uuid);

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return {
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
