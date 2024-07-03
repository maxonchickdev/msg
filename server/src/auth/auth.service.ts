import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { IUserLogin } from 'src/classes/users.classes'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async jwtValidateUser(username: string, password: string): Promise<any> {
    const pickedUser = await this.usersService.findByEmail(username);
    if (pickedUser && (await bcrypt.compare(password, pickedUser.password))) {
      const { password, ...result } = pickedUser;
      return result;
    }
    return null;
  }

  async login(data: IUserLogin) {
    const pickedUser = await this.usersService.findByEmail(data.email)
    const payload = { id: pickedUser.id,  username: pickedUser.username, email: pickedUser.email };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
