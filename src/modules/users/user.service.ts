import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../../../constants';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async getAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getOne(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { id } });
  }

  async getByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { email } });
  }

  async create(user: User) {
    const userWithSameEmail = await this.getByEmail(user.email);
    if (userWithSameEmail) {
      throw new Error('E-mail já existente');
    }
    return await this.userRepository.create<User>(user);
  }

  async update(user: User): Promise<[number]> {
    return this.userRepository.update(user, {
      where: {
        id: user.id,
      },
    });
  }

  async delete(id: number) {
    const user: User = await this.getOne(id);
    user.destroy();
  }
}
