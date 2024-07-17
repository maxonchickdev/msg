import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { IUpdateUser } from 'src/classes/users.classes';
import { User } from './user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('/api/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Print all users' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getUsers(@Res() res: Response) {
    try {
      const response = await this.userService.findAll();
      return res.status(200).json({ statusCode: 200, data: response });
    } catch (err) {
      return res
        .status(500)
        .json({ status: 500, data: 'Internal server error' });
    }
  }

  @Post()
  @HttpCode(200)
  @ApiBody({ type: User })
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 409, description: 'User exists' })
  @ApiResponse({ status: 200, description: 'User created successfully' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async createUser(@Body() user: User, @Res() res: Response) {
    try {
      const { statusCode, message } = await this.userService.createUser(user);
      return res.json({ statusCode: statusCode, message: message });
    } catch (err) {
      return res.json({ statusCode: err.status, message: err.response });
    }
  }

  @Post('/verified')
  @HttpCode(200)
  @ApiOperation({ summary: 'Validate user' })
  @ApiQuery({ name: 'email', type: String })
  @ApiQuery({ name: 'code', type: String })
  async validationUser(
    @Query('email') email: string,
    @Query('code') code: string,
    @Res() res: Response,
  ) {
    try {
      const { statusCode, message } = await this.userService.validateUser(
        email,
        code,
      );
      return res.json({ statusCode: statusCode, message: message });
    } catch (err) {
      return res.json({ statusCode: err.status, message: err.response });
    }
  }

  @Put(':id')
  @HttpCode(200)
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: IUpdateUser })
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUser: IUpdateUser,
    @Res() res: Response,
  ) {
    try {
      const { statusCode, message } = await this.userService.updateUser(
        id,
        updateUser,
      );
      return res.json({ statusCode: statusCode, message: message });
    } catch (err) {
      return res.json({ statusCode: err.status, message: err.message });
    }
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiParam({ name: 'id', type: String })
  @ApiOperation({ summary: 'Delete user by id' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async deleteUser(@Param('id') id: string, @Res() res: Response) {
    try {
      const { statusCode, message } = await this.userService.deleteUser(id);
      return res.json({ statusCode: statusCode, message: message });
    } catch (err) {
      return res.json({ statusCode: err.status, message: err.message });
    }
  }
}
