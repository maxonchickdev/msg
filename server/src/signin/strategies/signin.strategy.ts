import { AccessTokenDto } from '../dto/access.token.dto';
import { SigninUserDto } from '../dto/signin.user.dto';

export interface SingInStrategy {
  generateAccessJwt(loginUserDTO: SigninUserDto): Promise<AccessTokenDto>;
}
