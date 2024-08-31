import {
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { PayloadDTO } from 'src/signin/dto/payload.dto';
import { ParseRequest } from 'src/utils/decorators/parse.request.decorator';
import { TwoFactorAuthenticationCodeDTO } from './dto/two.factor.authentication.code.dto';
import { JwtTemporaryGuard } from './guards/jwt.temporary.guard';
import { TwofaService } from './twofa.service';

@Controller('twofa')
export class TwofaController {
  constructor(private readonly twofaService: TwofaService) {}

  @Post('generate-qr')
  @HttpCode(200)
  @UseGuards(JwtTemporaryGuard)
  async generateQr(@Res() res: Response, @ParseRequest() payload: PayloadDTO) {
    const otpauthUrl =
      await this.twofaService.generateTwoFactorAuthenticationSecret(payload);

    res.setHeader('Content-Type', 'image/png');

    return this.twofaService.pipeQrCodeStream(res, otpauthUrl);
  }

  @Post('turn-on')
  @HttpCode(200)
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
      return res.send('Two fa success');
    } catch (err) {
      return res
        .status(err.status)
        .json({ status: err.status, message: err.response });
    }
  }
}
