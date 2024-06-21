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
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { IUpdateUser, IUserData } from 'src/interfaces/users.interfaces';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Get all users' })
  async getUsers(@Res() res: Response) {
    try {
      const response = await this.userService.findAll();
      return res.status(200).json({ data: response });
    } catch (err) {
      return res.json({ status: 500, data: 'Internal server error' });
    }
  }

  @Post()
  @HttpCode(200)
  @ApiBody({ type: IUserData })
  @ApiOperation({ summary: 'Create new user' })
  async createUser(@Body() user: IUserData, @Res() res: Response) {
    try {
      const { msg, status } = await this.userService.createUser(user);
      return res.json({ status: status, msg: msg });
    } catch (err) {
      return res.json({ status: 500, msg: 'Internal server error' });
    }
  }

  @Put(':id')
  @HttpCode(200)
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: IUpdateUser })
  @ApiOperation({ summary: 'Update user' })
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
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    try {
      const { msg, status } = await this.userService.deleteUser(id);
      return res.json({ status: status, msg: msg });
    } catch (err) {
      return res.json({ status: 500, msg: 'Internal server error' });
    }
  }
}
