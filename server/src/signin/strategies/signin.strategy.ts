import { SigninTokensDto } from '../dto/signin.tokens.dto';
import { SigninUserDto } from '../dto/signin.user.dto';

export interface SingInStrategy {
  generateSigninTokens(loginUserDTO: SigninUserDto): Promise<SigninTokensDto>;
}
