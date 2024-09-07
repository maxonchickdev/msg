import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { PayloadDto } from 'src/signin/dto/payload.dto';
import { TwoFactorAuthenticationCodeDto } from './dto/two.factor.authentication.code.dto';
import { JwtGuard } from './guards/jwt.guard';
import { TwofaService } from './twofa.service';

@ApiTags('twofa')
@Controller('twofa')
export class TwofaController {
  constructor(private readonly twofaService: TwofaService) {}

  @Post('generate-qr')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  @ApiOperation({
    summary: 'Generate base64',
  })
  @ApiOkResponse({
    description: 'Base64 generated',
    example:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANQAAADUCAYAAADk...iVBORw0KGgoAAAANSUhEUgAAANQAAADUCAYAAADk',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    example: {
      statusCode: 404,
      message: 'User not found',
    },
  })
  async generateQr(
    @Res() res: Response,
    @Req() req: Request & { user: PayloadDto },
  ) {
    try {
      const otpauthUrl =
        await this.twofaService.generateTwoFactorAuthenticationSecret(req.user);
      return res
        .status(HttpStatus.OK)
        .send(await this.twofaService.generateQrCodeData(otpauthUrl));
    } catch (err) {
      return res.status(500).send('Internal server error');
    }
  }

  @Post('turn-on')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  @ApiOperation({
    summary: 'Enable 2fa',
  })
  @ApiOkResponse({
    description: 'Enable 2fa successfull',
    example: true,
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    example: {
      statusCode: 404,
      message: 'User not found',
    },
  })
  async turnOnTwoFactorAuthentication(
    @Req() req: Request & { user: PayloadDto },
    @Body() twoFactorAuthenticationCodeDTO: TwoFactorAuthenticationCodeDto,
    @Res() res: Response,
  ) {
    try {
      await this.twofaService.isTwoFactorAuthenticationCodeValid(
        twoFactorAuthenticationCodeDTO.code,
        req.user,
      );
      return res.status(HttpStatus.OK).send(true);
    } catch (err) {
      return res
        .status(err.status)
        .json({ status: err.status, message: err.response });
    }
  }
}
