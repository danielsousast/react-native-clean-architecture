import React from 'react';
import faker from '@faker-js/faker';
import * as Testing from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Login} from '@/presentation/screens/Login';
import {ValidationStub} from '@/presentation/test/mock-validation';
import {AuthenticationSpy} from '@/presentation/test/mock-authentication';
import {InvalidCredentialsError} from '@/domain/errors/InvalidCredentialsError';
import {SaveCurrentAccountMock} from '@/presentation/test/mock-save-current-account';
import * as Helper from '@/presentation/test/form-helper';
interface SutTypes {
  sut: Testing.RenderAPI;
  validationStub: ValidationStub;
  authenticationSpy: AuthenticationSpy;
  saveCurrentAccountMock: SaveCurrentAccountMock;
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  const saveCurrentAccountMock = new SaveCurrentAccountMock();
  validationStub.error = 'any_error';

  const sut = Testing.render(
    <NavigationContainer>
      <Login
        validation={validationStub}
        authentication={authenticationSpy}
        saveCurrentAccount={saveCurrentAccountMock}
      />
    </NavigationContainer>,
  );
  return {sut, validationStub, authenticationSpy, saveCurrentAccountMock};
};

const pupulateForm = (sut: Testing.RenderAPI) => {
  Helper.fillIpunt(sut, 'email-input');
  Helper.fillIpunt(sut, 'password-input');
};

describe('Login Screen', () => {
  afterEach(Testing.cleanup);
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
    expect(validationStub.fieldname).toEqual('password');
    expect(validationStub.fieldvalue).toEqual(password);
  });

  test('should present error if form is invalid', async () => {
    const {sut} = makeSut();
    Helper.fillIpunt(sut, 'password-input', faker.internet.password());
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
    const errorWrapper = sut.getByTestId('error-wrapper');
    await Testing.waitFor(() => errorWrapper);
    const errorMessage = sut.getByTestId('error-message');
    expect(errorMessage.children[0]).toEqual(error.message);
  });

  test('should call SaveCurrentAccount on success', async () => {
    const {sut, validationStub, authenticationSpy, saveCurrentAccountMock} =
      makeSut();
    validationStub.error = undefined;
    pupulateForm(sut);
    Helper.simulateSubmit(sut);
    const loginContainer = sut.getByTestId('login-container');
    await Testing.waitFor(() => loginContainer);
    expect(saveCurrentAccountMock.account).toEqual(authenticationSpy.account);
  });

  test('should present error if SaveCurrentAccount fails', async () => {
    const {sut, saveCurrentAccountMock} = makeSut();
    pupulateForm(sut);
    const error = new Error('Any Error');
    jest
      .spyOn(saveCurrentAccountMock, 'save')
      .mockReturnValue(Promise.reject(error));
    Helper.simulateSubmit(sut);
    const errorWrapper = sut.getByTestId('error-wrapper');
    await Testing.waitFor(() => errorWrapper);
    const errorMessage = sut.getByTestId('error-message');
    expect(errorMessage.children[0]).toEqual(error.message);
  });
});
