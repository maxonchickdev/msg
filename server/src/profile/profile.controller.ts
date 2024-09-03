import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { PayloadDTO } from 'src/signin/dto/payload.dto';
import { HttpExceptionDTO } from 'src/signup/dto/http.exception.dto';
import { ParseRequest } from '../utils/decorators/parse.request.decorator';
import { JwtGuard } from './guards/jwt.guard';
import { ProfileService } from './profile.service';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Get user profile' })
  @ApiNotFoundResponse({
    description: 'User not found',
    type: HttpExceptionDTO,
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'User not found',
    },
  })
  async getUserProfile(
    @ParseRequest() payload: PayloadDTO,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const profile = await this.profileService.getUserProfile(payload.email);
      return res.send(profile);
    } catch (err) {
      return res
        .status(err.status)
        .json({ status: err.status, message: err.response });
    }
  }
}
