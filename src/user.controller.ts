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
  getAll(): User[] {
    return this.userService.getAll();
  }

  @Get(':id')
  getOne(@Param() params): User {
    return this.userService.getOne(params.id);
  }

  @Post()
  create(@Body() user: User) {
    this.userService.create(user);
  }

  @Put()
  change(@Body() user: User) {
    return this.userService.change(user);
  }

  @Delete(':id')
  delete(@Param() params) {
    this.userService.delete(params.id);
  }
}
