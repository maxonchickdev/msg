import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { UsersService } from './users.service';
import { EmailValidationDto } from './dto/user.dto';
import { ValidationEmailGuard } from './guards/validate-email.guard';

@ApiTags('users')
@Controller('/api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Get all users' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getUsers(@Res() res: Response) {
    try {
      const response = await this.userService.findAll();
      return res.send(response);
    } catch (err) {
      return res.status(err.status).json({ message: err.response });
    }
  }

  @Post('/verified')
  @UseGuards(ValidationEmailGuard)
  @HttpCode(200)
  @ApiBody({ type: EmailValidationDto })
  @ApiOperation({ summary: 'Validate user' })
  @ApiResponse({ status: 404, description: 'User does not exists' })
  @ApiResponse({ status: 409, description: 'Invalid code' })
  @ApiResponse({ status: 200, description: 'Verification successfully' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async validationUser(
    @Body()
    emailValidationDto: EmailValidationDto,
    @Res() res: Response,
  ) {
    try {
      const response = await this.userService.validateUser(emailValidationDto);
      return res.send(response);
    } catch (err) {
      return res.send({ status: 200, message: 'Internal server error' });
    }
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiParam({ name: 'id', type: String })
  @ApiOperation({ summary: 'Delete user by id' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  async deleteUser(@Param('id') id: string, @Res() res: Response) {
    try {
      const response = await this.userService.deleteUser(id);
      return res.send(response);
    } catch (err) {
      return res.status(err.status).json({ message: err.response });
    }
  }
}
