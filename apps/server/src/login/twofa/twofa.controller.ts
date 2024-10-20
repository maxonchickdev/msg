import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
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
import { PayloadDto } from '../signin/dto/payload.dto';
import { TwoFactorAuthenticationCodeDto } from './dto/two-factor-authentication-code.dto';
import { JwtTwofaGuard } from './guards/jwt-twofa.guard';
import { TwofaService } from './twofa.service';
/**
 *
 *
 * @export
 * @class TwofaController
 */
@ApiTags('two-fa')
@Controller('two-fa')
export class TwofaController {
  private readonly logger = new Logger(TwofaController.name);
  /**
   * Creates an instance of TwofaController.
   * @param {TwofaService} twofaService
   * @memberof TwofaController
   */
  constructor(private readonly twofaService: TwofaService) {}
  /**
   *
   *
   * @param {Response} res
   * @param {(Request & { user: PayloadDto })} req
   * @return {*}
   * @memberof TwofaController
   */
  @Post('generate-qr')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtTwofaGuard)
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
    @Req() req: Request & { user: PayloadDto }
  ) {
    try {
      this.logger.log(`User ${req.user.userId} requested qr code`);
      const otpauthUrl =
        await this.twofaService.generateTwoFactorAuthenticationSecret(
          req.user.userId
        );
      this.logger.log(`User ${req.user.userId} generated qr code successfully`);
      return res
        .status(HttpStatus.OK)
        .send(await this.twofaService.generateQrCodeData(otpauthUrl));
    } catch (err) {
      this.logger.error('Error during qr code generation');
      return res.status(500).send(`Internal server error ${err}`);
    }
  }
  /**
   *
   *
   * @param {(Request & { user: PayloadDto })} req
   * @param {TwoFactorAuthenticationCodeDto} twoFactorAuthenticationCodeDTO
   * @param {Response} res
   * @return {*}
   * @memberof TwofaController
   */
  @Post('turn-on')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtTwofaGuard)
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
    @Res() res: Response
  ) {
    try {
      this.logger.log(`User ${req.user.userId} requested to turn on 2fa`);
      await this.twofaService.isTwoFactorAuthenticationCodeValid(
        twoFactorAuthenticationCodeDTO.twoFactorAuthenticationCode,
        req.user
      );
      this.logger.log(`User ${req.user.userId} turned on 2fa successfully`);
      return res.status(HttpStatus.OK).send(true);
    } catch (err) {
      this.logger.error('Error during 2fa enabling');
      return res
        .status(err.status)
        .json({ status: err.status, message: err.response });
    }
  }
}
