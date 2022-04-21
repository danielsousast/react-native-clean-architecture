import faker from '@faker-js/faker';
import {AuthenticationParams} from '@/domain/usecases/authentication';
import {AccountModel} from '../models/account-model';
import {RegistrationParams} from '../usecases/registration';

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.random.alphaNumeric(),
});

export const mockRegistration = (): RegistrationParams => ({
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  passwordConfirmation: faker.internet.password(),
});
