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
  @ApiOperation({ summary: 'Get all users' })
  async getUsers(@Res() res: Response) {
    try {
      const data = await this.userService.findAll();
      return res.status(200).json({ msg: 'All users printed', data: data });
    } catch (err) {
      return res.status(500).json({ msg: 'Internal server error', data: null });
    }
  }

  @Post()
  @HttpCode(200)
  @ApiBody({ type: IUserData })
  @ApiOperation({ summary: 'Create new user' })
  async createUser(@Body() user: IUserData, @Res() res: Response) {
    try {
      const response = await this.userService.createUser(user);
      return res.status(200).json({ msg: response[0], data: response[1] });
    } catch (err) {
      return res.status(500).json({ msg: 'Internal server error', data: null });
    }
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: IUpdateUser })
  @ApiOperation({ summary: 'Update user' })
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUser: IUpdateUser,
    @Res() res: Response,
  ) {
    try {
      const response = await this.userService.updateUser(id, updateUser);
      return res.status(200).json({ msg: response[0], data: response[1] });
    } catch (err) {
      return res.status(200).json({ msg: 'Internal server error', data: null });
    }
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiOperation({ summary: 'Delete user by id' })
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    try {
      const response = await this.userService.deleteUser(id);
      return res.status(200).json({ msg: response });
    } catch (err) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  }
}
