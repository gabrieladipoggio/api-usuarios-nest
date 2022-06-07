import { Table, Model, Column, DataType } from 'sequelize-typescript';
import { IsEmail, IsNotEmpty } from 'class-validator';
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
  email: string;

  @Column({ type: DataType.STRING })
  @IsNotEmpty({
    message: 'O campo senha é obrigatório',
  })
  password: string;
}
