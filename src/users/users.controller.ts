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
import { IUpdateUser, IUserData } from 'src/interfaces/users.interfaces';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async getUsers() {
    return await this.userService.findAll();
  }

  @Post()
  async createUser(@Body() user: IUserData) {
    return await this.userService.createUser(user);
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUser: IUpdateUser,
  ) {
    return await this.userService.updateUser(id, updateUser);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.deleteUser(id);
  }
}
