import faker from '@faker-js/faker';
import {AuthenticationParams} from '../usecases/authentication';

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});
