import { SigninUserDto } from '../dto/signin.user.dto';
import { TemporaryTokenDto } from '../dto/temporary.token.dto';

export interface SingInStrategy {
  generateTemporaryJwt(loginUserDTO: SigninUserDto): Promise<TemporaryTokenDto>;
}
