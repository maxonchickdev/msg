import { Injectable } from '@nestjs/common';
import { UserService } from 'src/utils/repositories/user/user.service';
import { UserProfileDTO } from './dto/user.profile.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly usersService: UserService) {}

  async getUserProfile(email: string): Promise<UserProfileDTO> {
    const user = await this.usersService.findUser({ email: email });

    const { id, password, isVerified, ...publicInfo } = user;

    return publicInfo;
  }
}
