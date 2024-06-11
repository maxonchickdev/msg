import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { IUpdateUser, IUserData } from 'src/interfaces/users.interfaces';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  async getUsers() {
    return await this.userService.findAll();
  }

  @Post()
  @ApiBody({ type: IUserData })
  @ApiOperation({ summary: 'Create new user' })
  async createUser(@Body() user: IUserData) {
    return await this.userService.createUser(user);
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: IUpdateUser })
  @ApiOperation({ summary: 'Update user' })
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUser: IUpdateUser,
  ) {
    return await this.userService.updateUser(id, updateUser);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiOperation({ summary: 'Delete user by id' })
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.deleteUser(id);
  }
}
