import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserDTOLogin {
  @Expose()
  email: string;

  @Expose()
  password: string;
}

@Exclude()
export class UserDTODetails {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  role: string;

  @Expose()
  lastLogin: Date;
}

@Exclude()
export class UserDTORegistration {
  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  password: string;

  @Expose()
  role: string;
}
