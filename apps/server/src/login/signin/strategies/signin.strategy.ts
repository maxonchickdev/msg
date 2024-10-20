import { SigninTokensDto } from '../dto/signin-tokens.dto';
import { SigninUserDto } from '../dto/signin-user.dto';
/**
 *
 *
 * @export
 * @interface SingInStrategy
 */
export interface SingInStrategy {
  /**
   *
   *
   * @param {SigninUserDto} loginUserDTO
   * @return {*}  {Promise<SigninTokensDto>}
   * @memberof SingInStrategy
   */
  generateSigninTokens(loginUserDTO: SigninUserDto): Promise<SigninTokensDto>;
}
