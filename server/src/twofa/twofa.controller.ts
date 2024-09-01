import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { PayloadDTO } from 'src/signin/dto/payload.dto';
import { ParseRequest } from 'src/utils/decorators/parse.request.decorator';
import { TwoFactorAuthenticationCodeDTO } from './dto/two.factor.authentication.code.dto';
import { JwtTemporaryGuard } from './guards/jwt.temporary.guard';
import { TwofaService } from './twofa.service';

@ApiTags('twofa')
@Controller('twofa')
export class TwofaController {
  constructor(private readonly twofaService: TwofaService) {}

  @Get('generate-qr')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtTemporaryGuard)
  async generateQr(@Res() res: Response, @ParseRequest() payload: PayloadDTO) {
    const otpauthUrl =
      await this.twofaService.generateTwoFactorAuthenticationSecret(payload);

    return res.send(await this.twofaService.pipeQrCode(otpauthUrl));
  }

  @Post('turn-on')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtTemporaryGuard)
  async turnOnTwoFactorAuthentication(
    @ParseRequest() payload: PayloadDTO,
    @Body() twoFactorAuthenticationCodeDTO: TwoFactorAuthenticationCodeDTO,
    @Res() res: Response,
  ) {
    try {
      await this.twofaService.isTwoFactorAuthenticationCodeValid(
        twoFactorAuthenticationCodeDTO.twoFactorAuthenticationCode,
        payload,
      );
      const { accessToken } = await this.twofaService.generateAccessToken(
        payload.email,
      );
      return res
        .cookie('acccessToken', accessToken, {
          httpOnly: true,
          secure: false,
          path: '/',
          sameSite: 'lax',
        })
        .clearCookie('temporaryToken', {
          httpOnly: true,
          secure: false,
          path: '/',
          sameSite: 'lax',
        })
        .send(true);
    } catch (err) {
      return res.json({ status: err.status, message: err.response });
    }
  }
}
