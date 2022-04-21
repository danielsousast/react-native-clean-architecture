import React from 'react';
import faker from '@faker-js/faker';
import {
  render,
  RenderAPI,
  fireEvent,
  cleanup,
  waitFor,
} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Login} from '@/presentation/screens/Login';
import {ValidationStub} from '@/presentation/test/mock-validation';
import {AuthenticationSpy} from '@/presentation/test/mock-authentication';
import {InvalidCredentialsError} from '@/domain/errors/InvalidCredentialsError';
import {SaveAccessTokenMock} from '@/presentation/test/mock-save-access-token';
import {
  fillIpunt,
  simulateSubmit,
  testButtonIsDisabled,
  testIfIsLoading,
  testInputIsEmpty,
} from '@/presentation/test/form-helper';
interface SutTypes {
  sut: RenderAPI;
  validationStub: ValidationStub;
  authenticationSpy: AuthenticationSpy;
  saveAccessTokenMock: SaveAccessTokenMock;
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  const saveAccessTokenMock = new SaveAccessTokenMock();
  validationStub.error = 'any_error';

  const sut = render(
    <NavigationContainer>
      <Login
        validation={validationStub}
        authentication={authenticationSpy}
        saveAccessToken={saveAccessTokenMock}
      />
    </NavigationContainer>,
  );
  return {sut, validationStub, authenticationSpy, saveAccessTokenMock};
};

const pupulateForm = (sut: RenderAPI) => {
  fillIpunt(sut, 'email-input');
  fillIpunt(sut, 'password-input');
};

describe('Login Screen', () => {
  afterEach(cleanup);
  test('should start with initial state', async () => {
    const {sut} = makeSut();
    testButtonIsDisabled(sut, 'submit');
    testInputIsEmpty(sut, 'email-input');
    testInputIsEmpty(sut, 'password-input');
  });

  test('should call Validation with correct email', async () => {
    const {sut, validationStub} = makeSut();
    const email = faker.internet.email();
    fillIpunt(sut, 'email-input', email);
    expect(validationStub.fieldname).toEqual('email');
    expect(validationStub.fieldvalue).toEqual(email);
  });

  test('should call Validation with correct password', async () => {
    const {sut, validationStub} = makeSut();
    const password = faker.internet.password();
    fillIpunt(sut, 'password-input', password);
    expect(validationStub.fieldname).toEqual('password');
    expect(validationStub.fieldvalue).toEqual(password);
  });

  test('should present error if form is invalid', async () => {
    const {sut} = makeSut();
    fillIpunt(sut, 'password-input', faker.internet.password());
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
    simulateSubmit(sut);
    testIfIsLoading(sut);
  });

  test('should call authentication with correct values', async () => {
    const {sut, validationStub, authenticationSpy} = makeSut();
    validationStub.error = undefined;
    const email = faker.internet.email();
    const password = faker.internet.password();
    fillIpunt(sut, 'email-input', email);
    fillIpunt(sut, 'password-input', password);
    simulateSubmit(sut);
    expect(authenticationSpy.params).toEqual({
      email,
      password,
    });
  });

  test('should call authentication only once', async () => {
    const {sut, validationStub, authenticationSpy} = makeSut();
    validationStub.error = undefined;
    pupulateForm(sut);
    const submit = sut.getByTestId('submit');
    fireEvent.press(submit);
    fireEvent.press(submit);
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
    simulateSubmit(sut);
    const errorWrapper = sut.getByTestId('error-wrapper');
    await waitFor(() => errorWrapper);
    const errorMessage = sut.getByTestId('error-message');
    expect(errorMessage.children[0]).toEqual(error.message);
  });

  test('should call SaveAccessToken on success', async () => {
    const {sut, validationStub, authenticationSpy, saveAccessTokenMock} =
      makeSut();
    validationStub.error = undefined;
    pupulateForm(sut);
    const submit = sut.getByTestId('submit');
    fireEvent.press(submit);
    const loginContainer = sut.getByTestId('login-container');
    await waitFor(() => loginContainer);
    expect(saveAccessTokenMock.accessToken).toBe(
      authenticationSpy.account.accessToken,
    );
  });

  test('should present error if SaveAccessToken fails', async () => {
    const {sut, saveAccessTokenMock} = makeSut();
    pupulateForm(sut);
    const error = new Error('Any Error');
    jest
      .spyOn(saveAccessTokenMock, 'save')
      .mockReturnValue(Promise.reject(error));
    simulateSubmit(sut);
    const errorWrapper = sut.getByTestId('error-wrapper');
    await waitFor(() => errorWrapper);
    const errorMessage = sut.getByTestId('error-message');
    expect(errorMessage.children[0]).toEqual(error.message);
  });
});
