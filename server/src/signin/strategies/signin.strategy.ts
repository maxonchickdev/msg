import { SigninUserDTO } from '../dto/signin.user.dto';
import { TemporaryTokenDTO } from '../dto/temporary.token.dto';

export interface SingInStrategy {
  generateTemporaryJwt(loginUserDTO: SigninUserDTO): Promise<TemporaryTokenDTO>;
}
