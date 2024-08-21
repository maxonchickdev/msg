import { AccessTokenDTO } from '../dto/access.token.dto';
import { LoginUserDTO } from '../dto/login.user.dto';

export interface SingInStrategy {
  generateJwt(loginUserDTO: LoginUserDTO): Promise<AccessTokenDTO>;
}
