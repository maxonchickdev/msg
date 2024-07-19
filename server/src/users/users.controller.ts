import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
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
import { User } from './user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('/api/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Get all users' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getUsers(@Res() res: Response) {
    try {
      const response = await this.userService.findAll();
      return res.json({ message: response });
    } catch (err) {
      return res.status(err.status).json({ message: err.response });
    }
  }

  @Post()
  @HttpCode(200)
  @ApiBody({ type: User })
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 409, description: 'User exists' })
  @ApiResponse({ status: 404, description: 'Incorrect email' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 200, description: 'Check mail' })
  async createUser(@Body() user: User, @Res() res: Response) {
    try {
      const { message } = await this.userService.createUser(user);
      return res.json({ message: message });
    } catch (err) {
      return res.status(err.status).json({ message: err.response });
    }
  }

  @Post('/verified')
  @HttpCode(200)
  @ApiOperation({ summary: 'Validate user' })
  @ApiResponse({ status: 404, description: 'User does not exists' })
  @ApiResponse({ status: 409, description: 'Invalid code' })
  @ApiResponse({ status: 200, description: 'Verification successfully' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiQuery({ name: 'email', type: String })
  @ApiQuery({ name: 'code', type: String })
  async validationUser(
    @Query('email') email: string,
    @Query('code') code: string,
    @Res() res: Response,
  ) {
    try {
      const { message } = await this.userService.validateUser(email, code);
      return res.json({ message: message });
    } catch (err) {
      return res.status(err.status).json({ message: err.response });
    }
  }

  // @Put(':id')
  // @HttpCode(200)
  // @ApiParam({ name: 'id', type: String })
  // @ApiBody({ type: IUpdateUser })
  // @ApiOperation({ summary: 'Update user' })
  // @ApiResponse({ status: 404, description: 'User not found' })
  // @ApiResponse({ status: 200, description: 'User updated successfully' })
  // @ApiResponse({ status: 500, description: 'Internal server error' })
  // async updateUser(
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Body() updateUser: IUpdateUser,
  //   @Res() res: Response,
  // ) {
  //   try {
  //     const { message } = await this.userService.updateUser(id, updateUser);
  //     return res.json({ message: message });
  //   } catch (err) {
  //     return res.json({ message: err.message });
  //   }
  // }

  @Delete(':id')
  @HttpCode(200)
  @ApiParam({ name: 'id', type: String })
  @ApiOperation({ summary: 'Delete user by id' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  async deleteUser(@Param('id') id: string, @Res() res: Response) {
    try {
      const { message } = await this.userService.deleteUser(id);
      return res.json({ message: message });
    } catch (err) {
      return res.status(err.status).json({ message: err.response });
    }
  }
}
