import faker from '@faker-js/faker';
import {AuthenticationParams} from '@/domain/usecases/authentication';
import {AccountModel} from '../models/account-model';

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.random.alphaNumeric(),
});
