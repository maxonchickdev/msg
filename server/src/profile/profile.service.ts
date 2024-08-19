import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/repositories/users/users.service';
import { UserProfileDTO } from './dto/user.profile.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly usersService: UsersService) {}

  async getUserProfile(uuid: string): Promise<UserProfileDTO> {
    const user = await this.usersService.findUser({ id: uuid });

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return {
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
