import React from 'react';
import faker from '@faker-js/faker';
import {
  render,
  RenderAPI,
  fireEvent,
  cleanup,
} from '@testing-library/react-native';
import {Login} from '@/presentation/screens/Login';
import {ValidationSpy} from '@/presentation/test/mock-validation';
import {
  Authentication,
  AuthenticationParams,
} from '@/domain/usecases/authentication';
import {AccountModel} from '@/domain/models/account-model';
import {mockAccountModel} from '@/domain/test/mock-account';

class AuthenticationSpy implements Authentication {
  account = mockAccountModel();
  params: AuthenticationParams | undefined;

  auth(crendetials: AuthenticationParams): Promise<AccountModel | undefined> {
    this.params = crendetials;
    return Promise.resolve(this.account);
  }
}

interface SutTypes {
  sut: RenderAPI;
  validationSpy: ValidationSpy;
  authenticationSpy: AuthenticationSpy;
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const authenticationSpy = new AuthenticationSpy();

  validationSpy.error = 'any_error';
  const sut = render(
    <Login validation={validationSpy} authentication={authenticationSpy} />,
  );
  return {sut, validationSpy, authenticationSpy};
};

const fillEmail = (sut: RenderAPI, email: string = faker.internet.email()) => {
  const emailInput = sut.getByTestId('email-input');
  fireEvent(emailInput, 'onChangeText', email);
};

const fillPassword = (
  sut: RenderAPI,
  password: string = faker.internet.password(),
) => {
  const passwordInput = sut.getByTestId('password-input');
  fireEvent(passwordInput, 'onChangeText', password);
};

describe('Login Screen', () => {
  afterEach(cleanup);
  test('should start with initial state', async () => {
    const {sut} = makeSut();
    const submit = sut.getByTestId('submit');
    const emailInput = sut.getByTestId('email-input');
    const passwordInput = sut.getByTestId('password-input');
    expect(submit.props.accessibilityState.disabled).toBeTruthy();
    expect(emailInput.props.value).toBe('');
    expect(passwordInput.props.value).toBe('');
  });

  test('should call Validation with correct email', async () => {
    const {sut, validationSpy} = makeSut();
    const email = faker.internet.email();
    fillEmail(sut, email);
    expect(validationSpy.fieldname).toEqual('email');
    expect(validationSpy.fieldvalue).toEqual(email);
  });

  test('should call Validation with correct password', async () => {
    const {sut, validationSpy} = makeSut();
    const password = faker.internet.password();
    fillPassword(sut, password);
    expect(validationSpy.fieldname).toEqual('password');
    expect(validationSpy.fieldvalue).toEqual(password);
  });

  test('should present error if form is invalid', async () => {
    const {sut} = makeSut();
    const password = faker.internet.password();
    fillPassword(sut, password);
    const errorStatus = sut.getByTestId('error-message');
    expect(errorStatus.children).toHaveLength(1);
  });

  test('should enable button if form is valid', async () => {
    const {sut} = makeSut();
    fillEmail(sut);
    fillPassword(sut);
    const submit = sut.getByTestId('submit');
    expect(submit.props.accessibilityState.disabled).toBeFalsy();
  });

  test('should render loading if form is submited', async () => {
    const {sut, validationSpy} = makeSut();
    validationSpy.error = undefined;
    fillEmail(sut);
    fillPassword(sut);
    const submit = sut.getByTestId('submit');
    fireEvent.press(submit);
    const spinner = sut.getByTestId('spinner');
    expect(spinner).toBeTruthy();
  });

  test('should call authentication with correct values', async () => {
    const {sut, validationSpy, authenticationSpy} = makeSut();
    validationSpy.error = undefined;
    const email = faker.internet.email();
    const password = faker.internet.password();
    fillEmail(sut, email);
    fillPassword(sut, password);
    const submit = sut.getByTestId('submit');
    fireEvent.press(submit);
    expect(authenticationSpy.params).toEqual({
      email,
      password,
    });
  });
});
