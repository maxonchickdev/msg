import { AccessTokenDTO } from '../dto/access.token.dto';
import { LoginUserDTO } from '../dto/login.user.dto';

export interface AuthStrategy {
  generateJwtToken(loginUserDTO: LoginUserDTO): Promise<AccessTokenDTO>;
}
