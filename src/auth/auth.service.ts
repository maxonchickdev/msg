import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { IUser, IUserData } from 'src/interfaces/users.interfaces'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const pickedUser = await this.usersService.findByUsername(username);
    if (pickedUser && (await bcrypt.compare(password, pickedUser.password))) {
      const { password, ...result } = pickedUser;
      return result;
    }
    return null;
  }

  async login(user: IUser) {
    const payload = { username: user.username, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async sessionLogin(user: IUserData): Promise<{msg: string, status: number}> {
    const findUser = this.usersService.findByUsername(user.username)
    if(findUser && await bcrypt.compare(user.password, (await findUser).password)) {
      return {msg: 'User exists', status: 200}
    }
    return {msg: 'User not found', status: 404}
  }
}
