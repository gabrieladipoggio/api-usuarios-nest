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
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get('id/:id')
  async getOne(@Param() params): Promise<User> {
    return this.userService.getOne(params.id);
  }

  @Get('email/:email')
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

  @Delete('id/:id')
  async delete(@Param() params) {
    this.userService.delete(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    console.log(req);
    return req.user;
  }
}
