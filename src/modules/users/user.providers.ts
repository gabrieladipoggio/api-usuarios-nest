import { User } from './user.model';
import { USER_REPOSITORY } from '../../../constants/index';

export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
];
