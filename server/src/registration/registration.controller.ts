import { RegistrationService } from './registration.service';
import {
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ValidationUserGuard } from 'src/users/guards/validate-new-user.guard';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/user.dto';
import { Response } from 'express';

@Controller('registration')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post()
  @UseGuards(ValidationUserGuard)
  @HttpCode(200)
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 409, description: 'User exists' })
  @ApiResponse({ status: 404, description: 'Incorrect email' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 200, description: 'Check mail' })
  async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const response = await this.registrationService.createUser(createUserDto);
      return res.send(response);
    } catch (err) {
      return res
        .status(err.status)
        .send({ status: err.status, message: err.response });
    }
  }
}
