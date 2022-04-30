import React from 'react';
import faker from '@faker-js/faker';
import * as Testing from '@testing-library/react-native';
import {Login} from '@/presentation/screens/Login';
import {ValidationStub} from '@/presentation/test/mock-validation';
import {AuthenticationSpy} from '@/presentation/test/mock-authentication';
import {InvalidCredentialsError} from '@/domain/errors/InvalidCredentialsError';
import * as Helper from '@/presentation/test/form-helper';
import {renderWithAuthProvider} from '@/../jest/helpers';
import {AccountModel} from '@/domain/models';

interface SutTypes {
  sut: Testing.RenderAPI;
  validationStub: ValidationStub;
  authenticationSpy: AuthenticationSpy;
  setCurrentAccount: (account: AccountModel) => void;
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  const setCurrentAccount = jest.fn();
  validationStub.error = 'any_error';

  const sut = renderWithAuthProvider({
    component: (
      <Login validation={validationStub} authentication={authenticationSpy} />
    ),
    setCurrentAccount,
  });
  return {sut, validationStub, authenticationSpy, setCurrentAccount};
};

const pupulateForm = (sut: Testing.RenderAPI) => {
  Helper.fillIpunt(sut, 'email-input');
  Helper.fillIpunt(sut, 'password-input');
};

describe('Login Screen', () => {
  test('should start with initial state', async () => {
    const {sut} = makeSut();
    Helper.testButtonIsDisabled(sut, 'submit');
    Helper.testInputIsEmpty(sut, 'email-input');
    Helper.testInputIsEmpty(sut, 'password-input');
  });
  test('should call Validation with correct email', async () => {
    const {sut, validationStub} = makeSut();
    const email = faker.internet.email();
    Helper.fillIpunt(sut, 'email-input', email);
    expect(validationStub.fieldname).toEqual('email');
    expect(validationStub.fieldvalue).toEqual(email);
  });

  test('should call Validation with correct password', async () => {
    const {sut, validationStub} = makeSut();
    const password = faker.internet.password();
    Helper.fillIpunt(sut, 'password-input', password);
    await Helper.waitForComponent(sut, 'login-container');
    expect(validationStub.fieldname).toEqual('password');
    expect(validationStub.fieldvalue).toEqual(password);
  });

  test('should present error if form is invalid', async () => {
    const {sut} = makeSut();
    Helper.fillIpunt(sut, 'password-input', faker.internet.password());
    await Helper.waitForComponent(sut, 'login-container');
    const errorStatus = sut.getByTestId('error-message');
    expect(errorStatus.children).toHaveLength(1);
  });

  test('should enable button if form is valid', async () => {
    const {sut} = makeSut();
    pupulateForm(sut);
    const submit = sut.getByTestId('submit');
    expect(submit.props.accessibilityState.disabled).toBeFalsy();
  });

  test('should render loading if form is submited', async () => {
    const {sut, validationStub} = makeSut();
    validationStub.error = undefined;
    pupulateForm(sut);
    Helper.simulateSubmit(sut);
    Helper.testIfIsLoading(sut);
  });

  test('should call authentication with correct values', async () => {
    const {sut, validationStub, authenticationSpy} = makeSut();
    validationStub.error = undefined;
    const email = faker.internet.email();
    const password = faker.internet.password();
    Helper.fillIpunt(sut, 'email-input', email);
    Helper.fillIpunt(sut, 'password-input', password);
    Helper.simulateSubmit(sut);
    await Helper.waitForComponent(sut, 'login-container');
    expect(authenticationSpy.params).toEqual({
      email,
      password,
    });
  });

  test('should call authentication only once', async () => {
    const {sut, validationStub, authenticationSpy} = makeSut();
    validationStub.error = undefined;
    pupulateForm(sut);
    Helper.simulateSubmit(sut);
    Helper.simulateSubmit(sut);
    await Helper.waitForComponent(sut, 'login-container');
    expect(authenticationSpy.callsCount).toEqual(1);
  });

  test('should present error if authentication fails', async () => {
    const {sut, validationStub, authenticationSpy} = makeSut();
    validationStub.error = undefined;
    pupulateForm(sut);
    const error = new InvalidCredentialsError();
    jest
      .spyOn(authenticationSpy, 'auth')
      .mockReturnValue(Promise.reject(error));
    Helper.simulateSubmit(sut);
    await Helper.waitForComponent(sut, 'login-container');
    const errorMessage = sut.getByTestId('error-message');
    expect(errorMessage.children[0]).toEqual(error.message);
  });

  test('should call SaveCurrentAccount on success', async () => {
    const {sut, validationStub, authenticationSpy, setCurrentAccount} =
      makeSut();
    validationStub.error = undefined;
    pupulateForm(sut);
    Helper.simulateSubmit(sut);
    await Helper.waitForComponent(sut, 'login-container');
    expect(setCurrentAccount).toHaveBeenCalledWith(authenticationSpy.account);
  });
});
