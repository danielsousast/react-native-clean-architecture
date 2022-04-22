import React from 'react';
import faker from '@faker-js/faker';
import {
  render,
  RenderAPI,
  cleanup,
  waitFor,
} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {ValidationStub} from '@/presentation/test/mock-validation';
import {Register} from '@/presentation/screens/Register';
import {RegistrationSpy} from '@/presentation/test/mock-registration';
import {
  fillIpunt,
  simulateSubmit,
  testButtonIsDisabled,
  testButtonIsEnabled,
  testIfIsLoading,
  testInputIsEmpty,
} from '@/presentation/test/form-helper';
import {SaveAccessTokenMock} from '@/presentation/test/mock-save-access-token';

interface SutTypes {
  sut: RenderAPI;
  validationStub: ValidationStub;
  registrationSpy: RegistrationSpy;
  saveAccessTokenMock: SaveAccessTokenMock;
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub();
  const registrationSpy = new RegistrationSpy();
  const saveAccessTokenMock = new SaveAccessTokenMock();
  validationStub.error = 'any_error';

  const sut = render(
    <NavigationContainer>
      <Register
        validation={validationStub}
        registration={registrationSpy}
        saveAccessToken={saveAccessTokenMock}
      />
    </NavigationContainer>,
  );
  return {sut, validationStub, registrationSpy, saveAccessTokenMock};
};

const pupulateForm = (sut: RenderAPI) => {
  fillIpunt(sut, 'email-input');
  fillIpunt(sut, 'password-input');
  fillIpunt(sut, 'name-input');
  fillIpunt(sut, 'confirm-password-input');
};

describe('Login Screen', () => {
  afterEach(cleanup);
  test('should start with initial state', async () => {
    const {sut} = makeSut();
    testInputIsEmpty(sut, 'name-input');
    testInputIsEmpty(sut, 'email-input');
    testInputIsEmpty(sut, 'password-input');
    testInputIsEmpty(sut, 'confirm-password-input');
    testButtonIsDisabled(sut, 'submit');
  });

  test('should present error if register form is invalid', async () => {
    const {sut, validationStub} = makeSut();
    validationStub.error = faker.random.words();
    fillIpunt(sut, 'password-input');
    const errorStatus = sut.getByTestId('error-message');
    expect(errorStatus.children).toHaveLength(1);
  });

  test('should enable button if register form is valid', async () => {
    const {sut} = makeSut();
    fillIpunt(sut, 'password-input');
    fillIpunt(sut, 'email-input');
    fillIpunt(sut, 'name-input');
    fillIpunt(sut, 'confirm-password-input');
    testButtonIsEnabled(sut, 'submit');
  });

  test('should render register loading if form is submited', async () => {
    const {sut, validationStub} = makeSut();
    validationStub.error = undefined;
    fillIpunt(sut, 'password-input');
    fillIpunt(sut, 'email-input');
    fillIpunt(sut, 'name-input');
    fillIpunt(sut, 'confirm-password-input');
    simulateSubmit(sut);
    testIfIsLoading(sut);
  });

  test('should call registration with correct values', async () => {
    const {sut, validationStub, registrationSpy} = makeSut();
    validationStub.error = undefined;
    const email = faker.internet.email();
    const password = faker.internet.password();
    const name = faker.random.word();
    const passwordConfirmation = faker.internet.password();
    fillIpunt(sut, 'email-input', email);
    fillIpunt(sut, 'password-input', password);
    fillIpunt(sut, 'name-input', name);
    fillIpunt(sut, 'confirm-password-input', passwordConfirmation);
    simulateSubmit(sut);
    expect(registrationSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation,
    });
  });

  test('should call registration only once', async () => {
    const {sut, validationStub, registrationSpy} = makeSut();
    validationStub.error = undefined;
    pupulateForm(sut);
    simulateSubmit(sut);
    simulateSubmit(sut);
    expect(registrationSpy.callsCount).toEqual(1);
  });

  test('should present error if registration fails', async () => {
    const {sut, validationStub, registrationSpy} = makeSut();
    validationStub.error = undefined;
    pupulateForm(sut);
    const error = new Error('any_error');
    jest
      .spyOn(registrationSpy, 'register')
      .mockReturnValue(Promise.reject(error));
    simulateSubmit(sut);
    const errorWrapper = sut.getByTestId('error-wrapper');
    await waitFor(() => errorWrapper);
    const errorMessage = sut.getByTestId('error-message');
    expect(errorMessage.children[0]).toEqual(error.message);
  });

  test('should not call registration if form is invalid', async () => {
    const {sut, validationStub, registrationSpy} = makeSut();
    validationStub.error = faker.random.words();
    pupulateForm(sut);
    simulateSubmit(sut);
    expect(registrationSpy.callsCount).toEqual(0);
  });

  test('should call SaveAccessToken on success', async () => {
    const {sut, validationStub, registrationSpy, saveAccessTokenMock} =
      makeSut();
    validationStub.error = undefined;
    pupulateForm(sut);
    simulateSubmit(sut);
    const loginContainer = sut.getByTestId('login-container');
    await waitFor(() => loginContainer);
    expect(saveAccessTokenMock.accessToken).toBe(
      registrationSpy.account.accessToken,
    );
  });

  test('should present error if SaveAccessToken fails', async () => {
    const {sut, saveAccessTokenMock} = makeSut();
    pupulateForm(sut);
    const error = new Error('any_error');
    jest
      .spyOn(saveAccessTokenMock, 'save')
      .mockReturnValue(Promise.reject(error));
    simulateSubmit(sut);
    const errorWrapper = sut.getByTestId('error-wrapper');
    await waitFor(() => errorWrapper);
    const errorMessage = sut.getByTestId('error-message');
    expect(errorMessage.children[0]).toEqual(error.message);
  });

  test('should call Validation with correct name', async () => {
    const {sut, validationStub} = makeSut();
    const name = faker.name.firstName();
    fillIpunt(sut, 'name-input', name);
    expect(validationStub.fieldname).toEqual('name');
    expect(validationStub.fieldvalue).toEqual(name);
  });

  test('should call Validation with correct password', async () => {
    const {sut, validationStub} = makeSut();
    const password = faker.internet.password();
    fillIpunt(sut, 'password-input', password);
    expect(validationStub.fieldname).toEqual('password');
    expect(validationStub.fieldvalue).toEqual(password);
  });

  test('should call Validation with correct email', async () => {
    const {sut, validationStub} = makeSut();
    const email = faker.internet.email();
    fillIpunt(sut, 'email-input', email);
    expect(validationStub.fieldname).toEqual('email');
    expect(validationStub.fieldvalue).toEqual(email);
  });

  test('should call Validation with correct passwordConfirmation', async () => {
    const {sut, validationStub} = makeSut();
    const password = faker.internet.password();
    fillIpunt(sut, 'confirm-password-input', password);
    expect(validationStub.fieldname).toEqual('passwordConfirmation');
    expect(validationStub.fieldvalue).toEqual(password);
  });
});
