import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { User } from './user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  async getOne(@Param() params): Promise<User> {
    return this.userService.getOne(params.id);
  }

  @Get(':email')
  async getByEmail(@Param() params): Promise<User> {
    return this.userService.getByEmail(params.email);
  }

  @Post()
  async create(@Body() user: User) {
    return this.userService.create(user);
  }

  @Put()
  async update(@Body() user: User): Promise<[number]> {
    return this.userService.update(user);
  }

  @Delete(':id')
  async delete(@Param() params) {
    this.userService.delete(params.id);
  }
}
