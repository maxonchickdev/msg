import { LoginUserDTO } from '../dto/signin.user.dto';
import { TemporaryTokenDTO } from '../dto/temporary.token.dto';

export interface SingInStrategy {
  generateTemporaryJwt(loginUserDTO: LoginUserDTO): Promise<TemporaryTokenDTO>;
}
