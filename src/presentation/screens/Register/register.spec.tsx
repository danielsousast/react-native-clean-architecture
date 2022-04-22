import React from 'react';
import faker from '@faker-js/faker';
import {render, RenderAPI, cleanup} from '@testing-library/react-native';
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

interface SutTypes {
  sut: RenderAPI;
  validationStub: ValidationStub;
  registrationSpy: RegistrationSpy;
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub();
  const registrationSpy = new RegistrationSpy();
  validationStub.error = 'any_error';

  const sut = render(
    <NavigationContainer>
      <Register validation={validationStub} registration={registrationSpy} />
    </NavigationContainer>,
  );
  return {sut, validationStub, registrationSpy};
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
});
