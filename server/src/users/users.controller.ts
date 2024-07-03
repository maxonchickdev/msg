import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common'
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { IUpdateUser, IUserData } from 'src/classes/users.classes'
import { UsersService } from './users.service'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Print all users'})
  @ApiResponse({ status: 500, description: 'Internal server error'})
  async getUsers(@Res() res: Response) {
    try {
      const response = await this.userService.findAll();
      return res.status(200).json({ status: 200, data: response });
    } catch (err) {
      return res.status(500).json({ status: 500, data: 'Internal server error' });
    }
  }

  @Post()
  @HttpCode(200)
  @ApiBody({ type: IUserData })
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 409, description: 'User exists'})
  @ApiResponse({ status: 200, description: 'User created successfully'})
  @ApiResponse({ status: 500, description: 'Internal server error'})
  async createUser(@Body() user: IUserData, @Res() res: Response) {
    try {
      const { msg, status } = await this.userService.createUser(user);
      return res.json({ status: status, msg: msg });
    } catch (err) {
      return res.status(500).json({ status: 500, msg: 'Internal server error' });
    }
  }

  @Put(':id')
  @HttpCode(200)
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: IUpdateUser })
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 404, description: 'User not found'})
  @ApiResponse({ status: 200, description: 'User updated successfully'})
  @ApiResponse({ status: 500, description: 'Internal server error'})
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUser: IUpdateUser,
    @Res() res: Response,
  ) {
    try {
      const { msg, status } = await this.userService.updateUser(id, updateUser);
      return res.json({ status: status, msg: msg });
    } catch (err) {
      return res.json({ status: 500, msg: 'Internal server error' });
    }
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiParam({ name: 'id', type: Number })
  @ApiOperation({ summary: 'Delete user by id' })
  @ApiResponse({ status: 200, description: 'User deleted successfully'})
  @ApiResponse({ status: 404, description: 'User not found'})
  @ApiResponse({ status: 500, description: 'Internal server error'})
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    try {
      const { msg, status } = await this.userService.deleteUser(id);
      return res.json({ status: status, msg: msg });
    } catch (err) {
      return res.status(500).json({ status: 500, msg: 'Internal server error' });
    }
  }
}
