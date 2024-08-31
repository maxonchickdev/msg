import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/utils/repositories/users/users.service';
import { UserProfileDTO } from './dto/user.profile.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly usersService: UsersService) {}

  async getUserProfile(email: string): Promise<UserProfileDTO> {
    const user = await this.usersService.findUser({ email: email });

    const { id, password, isVerified, ...publicInfo } = user;

    return publicInfo;
  }
}
