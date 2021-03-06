import { Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserDTOLogin } from '../users/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.getUserWithPassword(email);
    const response = await bcrypt.compare(pass, user.password);
    return response ? user : null;
  }

  async login(userDetails: UserDTOLogin) {
    const user = await this.userService.getUserWithPassword(userDetails.email);
    const payload = { email: user.email, sub: user.id };
    const now = new Date(Date.now());
    this.userService.updateLastLogin(user.email, now);
    return {
      id: user.id,
      email: user.email,
      created: user.createdAt,
      modified: user.updatedAt,
      access_token: this.jwtService.sign(payload),
      last_login: now,
      roles: user.role,
    };
  }
}
