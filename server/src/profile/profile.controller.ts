import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { PayloadDto } from 'src/signin/dto/payload.dto';
import { HttpExceptionDto } from 'src/signup/dto/http.exception.dto';
import { Jwt2FaGuard } from './guards/jwt.2fa.guard';
import { ProfileService } from './profile.service';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(Jwt2FaGuard)
  @ApiOperation({ summary: 'Get user profile' })
  @ApiNotFoundResponse({
    description: 'User not found',
    type: HttpExceptionDto,
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'User not found',
    },
  })
  async getUserProfile(
    @Req() req: Request & { user: PayloadDto },
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const profile = await this.profileService.getUserProfile(req.user.email);
      return res.send(profile);
    } catch (err) {
      return res
        .status(err.status)
        .json({ status: err.status, message: err.response });
    }
  }

  @Post('avatar')
  @UseGuards(Jwt2FaGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async addProfileImage(
    @Req() req: Request & { user: PayloadDto },
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    console.log(file);
    return res.send('success');
    return await this.profileService.uploadAvatar(
      req.user.email,
      file.buffer,
      file.originalname,
    );
  }
}
