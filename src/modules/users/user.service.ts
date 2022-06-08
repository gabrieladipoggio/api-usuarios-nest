import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { USER_REPOSITORY } from '../../../constants';
import { UserDTODetails, UserDTORegistration } from './user.dto';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async getAll(): Promise<UserDTODetails[]> {
    const userEntity = await this.userRepository.findAll();
    return userEntity.map((user) => {
      return plainToClass(UserDTODetails, user);
    });
  }

  async getOne(id: number): Promise<UserDTODetails> {
    const userEntity = await this.userRepository.findOne<User>({
      where: { id },
    });
    return plainToClass(UserDTODetails, userEntity);
  }

  async getByEmail(email: string): Promise<UserDTODetails> {
    const userEntity = await this.userRepository.findOne<User>({
      where: { email },
    });
    return plainToClass(UserDTODetails, userEntity);
  }

  async getUserWithPassword(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({
      where: { email },
    });
  }

  async create(user: UserDTORegistration) {
    const userWithSameEmail = await this.getByEmail(user.email);
    if (userWithSameEmail) {
      throw new Error('E-mail já existente');
    }
    const userEntity = await this.userRepository.create<User>(user);
    return plainToClass(UserDTODetails, userEntity);
  }

  async update(user: UserDTORegistration): Promise<UserDTODetails> {
    /*
      Não permite atualizar o email 
    */
    const userEntity = await this.userRepository.update(user, {
      where: {
        email: user.email,
      },
    });
    if (userEntity[0] > 0) {
      return this.getByEmail(user.email);
    } else {
      throw new Error('Usuário inválido');
    }
  }

  async updateLastLogin(
    userEmail: string,
    newLogin: Date,
  ): Promise<UserDTODetails> {
    const userEntity = await this.userRepository.update(
      { lastLogin: newLogin },
      {
        where: {
          email: userEmail,
        },
      },
    );
    if (userEntity[0] > 0) {
      return this.getByEmail(userEmail);
    } else {
      throw new Error('Usuário inválido');
    }
  }

  async delete(id: number) {
    const userEntity = await this.userRepository.findOne<User>({
      where: { id },
    });
    return userEntity.destroy();
  }
}
