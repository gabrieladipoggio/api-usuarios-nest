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
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserDTODetails, UserDTORegistration } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAll(): Promise<UserDTODetails[]> {
    return this.userService.getAll();
  }

  @Get('id/:id')
  async getOne(@Param() params): Promise<UserDTODetails> {
    return this.userService.getOne(params.id);
  }

  @Get('email/:email')
  async getByEmail(@Param() params): Promise<UserDTODetails> {
    return this.userService.getByEmail(params.email);
  }

  @Post()
  async create(@Body() user: UserDTORegistration) {
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
  async update(@Body() user: UserDTORegistration): Promise<UserDTODetails> {
    try {
      return await this.userService.update(user);
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

  @Delete('id/:id')
  async delete(@Param() params) {
    this.userService.delete(params.id);
    return { message: 'Usuário deletado com sucesso!' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
