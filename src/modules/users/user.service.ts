import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ){};

  async getAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async getOne(id: number): Promise<User> {
    return this.userModel.findByPk(id);
  }

  async create(user: User) {
    this.userModel.create(user);
  }

  async update(user: User): Promise<[number]>{
    return this.userModel.update(user, {
      where: {
        id: user.id
      }
    });
  }

  async delete(id: number) {
    const user: User = await this.getOne(id);
    user.destroy();
  }
}
