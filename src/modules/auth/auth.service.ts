import { Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.model';
import { UserDTOLogin } from '../users/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.getUserWithPassword(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(userDetails: UserDTOLogin) {
    const user = await this.userService.getUserWithPassword(userDetails.email);
    const payload = { email: user.email, sub: user.id };
    return {
      id: user.id,
      created: user.createdAt,
      modified: user.updatedAt,
      access_token: this.jwtService.sign(payload),
      last_login: user.lastLogin,
      roles: user.role,
    };
  }
}
