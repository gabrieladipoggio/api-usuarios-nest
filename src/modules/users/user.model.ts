import { Table, Model, Column, DataType } from 'sequelize-typescript';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { IsEmailUnique } from './is-email-unique.validator';
@Table
export class User extends Model<User> {
  @Column({ type: DataType.STRING })
  @IsNotEmpty({
    message: 'O campo nome é obrigatório',
  })
  name: string;

  @Column({ type: DataType.STRING, unique: true })
  @IsEmail({}, { message: 'Insira um email válido' })
  @IsNotEmpty({
    message: 'O campo email é obrigatório',
  })
  /* @IsEmailUnique({
    message: 'Esse email já está registrado',
  }) */
  email: string;

  @Column({ type: DataType.STRING })
  @IsNotEmpty({
    message: 'O campo senha é obrigatório',
  })
  password: string;
}
