import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  Put,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { User } from './user.model';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

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
    try {
      return await this.userService.create(user);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put()
  async update(@Body() user: User): Promise<[number]> {
    return this.userService.update(user);
  }

  @Delete(':id')
  async delete(@Param() params) {
    this.userService.delete(params.id);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return req.user.dataValues;
  }
}
