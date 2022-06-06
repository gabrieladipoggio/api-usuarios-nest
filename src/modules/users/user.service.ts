import { Injectable } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UserService {
  users: User[] = [
  //  new User('Gabi', 'gabi@teste.com', '1234')
  ];

  getAll(): User[] {
    return this.users;
  }

  getOne(id: number): User {
    return this.users[0];
  }

  create(user: User) {
    this.users.push(user);
  }

  change(user: User) {
    return user;
  }

  delete(id: number) {
    return this.users.pop();
  }
}
