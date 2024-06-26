import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { IUserData, IUserLogin } from 'src/classes/users.classes'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async jwtValidateUser(email: string, password: string): Promise<any> {
    const pickedUser = await this.usersService.findByEmail(email);
    if (pickedUser && (await bcrypt.compare(password, pickedUser.password))) {
      const { password, ...result } = pickedUser;
      console.log(result)
      return result;
    }
    return null;
  }

  async jwtLogin(data: IUserLogin) {
    const pickedUser = await this.usersService.findByEmail(data.email)
    const payload = { id: pickedUser.id,  username: pickedUser.username, email: pickedUser.email };
    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async sessionLogin(user: IUserData): Promise<{msg: string, status: number}> {
    const findUser = this.usersService.findByEmail(user.email)
    if(findUser && await bcrypt.compare(user.password, (await findUser).password)) {
      return {msg: 'User exists', status: 200}
    }
    return {msg: 'User not found', status: 404}
  }
}
