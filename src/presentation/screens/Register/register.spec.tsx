import React from 'react';
import faker from '@faker-js/faker';
import * as Testing from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {ValidationStub} from '@/presentation/test/mock-validation';
import {Register} from '@/presentation/screens/Register';
import {RegistrationSpy} from '@/presentation/test/mock-registration';
import * as Helper from '@/presentation/test/form-helper';
import {SaveCurrentAccountMock} from '@/presentation/test/mock-save-current-account';

interface SutTypes {
  sut: Testing.RenderAPI;
  validationStub: ValidationStub;
  registrationSpy: RegistrationSpy;
  saveCurrentAccountMock: SaveCurrentAccountMock;
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub();
  const registrationSpy = new RegistrationSpy();
  const saveCurrentAccountMock = new SaveCurrentAccountMock();
  validationStub.error = 'any_error';

  const sut = Testing.render(
    <NavigationContainer>
      <Register
        validation={validationStub}
        registration={registrationSpy}
        saveCurrentAccount={saveCurrentAccountMock}
      />
    </NavigationContainer>,
  );
  return {sut, validationStub, registrationSpy, saveCurrentAccountMock};
};

const pupulateForm = (sut: Testing.RenderAPI) => {
  Helper.fillIpunt(sut, 'email-input');
  Helper.fillIpunt(sut, 'password-input');
  Helper.fillIpunt(sut, 'name-input');
  Helper.fillIpunt(sut, 'confirm-password-input');
};

describe('Login Screen', () => {
  afterEach(Testing.cleanup);
  test('should start with initial state', async () => {
    const {sut} = makeSut();
    Helper.testInputIsEmpty(sut, 'name-input');
    Helper.testInputIsEmpty(sut, 'email-input');
    Helper.testInputIsEmpty(sut, 'password-input');
    Helper.testInputIsEmpty(sut, 'confirm-password-input');
    Helper.testButtonIsDisabled(sut, 'submit');
  });

  test('should present error if register form is invalid', async () => {
    const {sut, validationStub} = makeSut();
    validationStub.error = faker.random.words();
    Helper.fillIpunt(sut, 'password-input');
    const errorStatus = sut.getByTestId('error-message');
    expect(errorStatus.children).toHaveLength(1);
  });

  test('should enable button if register form is valid', async () => {
    const {sut} = makeSut();
    Helper.fillIpunt(sut, 'password-input');
    Helper.fillIpunt(sut, 'email-input');
    Helper.fillIpunt(sut, 'name-input');
    Helper.fillIpunt(sut, 'confirm-password-input');
    Helper.testButtonIsEnabled(sut, 'submit');
  });

  test('should render register loading if form is submited', async () => {
    const {sut, validationStub} = makeSut();
    validationStub.error = undefined;
    Helper.fillIpunt(sut, 'password-input');
    Helper.fillIpunt(sut, 'email-input');
    Helper.fillIpunt(sut, 'name-input');
    Helper.fillIpunt(sut, 'confirm-password-input');
    Helper.simulateSubmit(sut);
    Helper.testIfIsLoading(sut);
  });

  test('should call registration with correct values', async () => {
    const {sut, validationStub, registrationSpy} = makeSut();
    validationStub.error = undefined;
    const email = faker.internet.email();
    const password = faker.internet.password();
    const name = faker.random.word();
    const passwordConfirmation = faker.internet.password();
    Helper.fillIpunt(sut, 'email-input', email);
    Helper.fillIpunt(sut, 'password-input', password);
    Helper.fillIpunt(sut, 'name-input', name);
    Helper.fillIpunt(sut, 'confirm-password-input', passwordConfirmation);
    Helper.simulateSubmit(sut);
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
    Helper.simulateSubmit(sut);
    Helper.simulateSubmit(sut);
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
    Helper.simulateSubmit(sut);
    const errorWrapper = sut.getByTestId('error-wrapper');
    await Testing.waitFor(() => errorWrapper);
    const errorMessage = sut.getByTestId('error-message');
    expect(errorMessage.children[0]).toEqual(error.message);
  });

  test('should not call registration if form is invalid', async () => {
    const {sut, validationStub, registrationSpy} = makeSut();
    validationStub.error = faker.random.words();
    pupulateForm(sut);
    Helper.simulateSubmit(sut);
    expect(registrationSpy.callsCount).toEqual(0);
  });

  test('should call SaveCurrentAccount on success', async () => {
    const {sut, validationStub, registrationSpy, saveCurrentAccountMock} =
      makeSut();
    validationStub.error = undefined;
    pupulateForm(sut);
    Helper.simulateSubmit(sut);
    const loginContainer = sut.getByTestId('login-container');
    await Testing.waitFor(() => loginContainer);
    expect(saveCurrentAccountMock.account).toEqual(registrationSpy.account);
  });

  test('should present error if SaveCurrentAccount fails', async () => {
    const {sut, saveCurrentAccountMock} = makeSut();
    pupulateForm(sut);
    const error = new Error('any_error');
    jest
      .spyOn(saveCurrentAccountMock, 'save')
      .mockReturnValue(Promise.reject(error));
    Helper.simulateSubmit(sut);
    const errorWrapper = sut.getByTestId('error-wrapper');
    await Testing.waitFor(() => errorWrapper);
    const errorMessage = sut.getByTestId('error-message');
    expect(errorMessage.children[0]).toEqual(error.message);
  });

  test('should call Validation with correct name', async () => {
    const {sut, validationStub} = makeSut();
    const name = faker.name.firstName();
    Helper.fillIpunt(sut, 'name-input', name);
    expect(validationStub.fieldname).toEqual('name');
    expect(validationStub.fieldvalue).toEqual(name);
  });

  test('should call Validation with correct password', async () => {
    const {sut, validationStub} = makeSut();
    const password = faker.internet.password();
    Helper.fillIpunt(sut, 'password-input', password);
    expect(validationStub.fieldname).toEqual('password');
    expect(validationStub.fieldvalue).toEqual(password);
  });

  test('should call Validation with correct email', async () => {
    const {sut, validationStub} = makeSut();
    const email = faker.internet.email();
    Helper.fillIpunt(sut, 'email-input', email);
    expect(validationStub.fieldname).toEqual('email');
    expect(validationStub.fieldvalue).toEqual(email);
  });

  test('should call Validation with correct passwordConfirmation', async () => {
    const {sut, validationStub} = makeSut();
    const password = faker.internet.password();
    Helper.fillIpunt(sut, 'confirm-password-input', password);
    expect(validationStub.fieldname).toEqual('passwordConfirmation');
    expect(validationStub.fieldvalue).toEqual(password);
  });
});
