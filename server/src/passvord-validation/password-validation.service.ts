import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class PasswordValidationService {
  async validatePassword(password: string) {
    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(password))
      throw new HttpException(
        'Password must not contain whitespaces.',
        HttpStatus.CONFLICT,
      );

    const isContainUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainUppercase.test(password))
      throw new HttpException(
        'Password must have at least one uppercase character',
        HttpStatus.CONFLICT,
      );

    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    if (!isContainsLowercase.test(password))
      throw new HttpException(
        'Password must have at least one lowercase character',
        HttpStatus.CONFLICT,
      );

    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(password))
      throw new HttpException(
        'Password must contain at least one digit',
        HttpStatus.CONFLICT,
      );

    const isContainsSymbol =
      /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
    if (!isContainsSymbol.test(password))
      throw new HttpException(
        'Password must contain at least one special symbol',
        HttpStatus.CONFLICT,
      );

    const isValidLength = /^.{8,16}$/;
    if (isValidLength.test(password))
      throw new HttpException(
        'Password must be 8-16 characters long',
        HttpStatus.CONFLICT,
      );

    return null;
  }
}
