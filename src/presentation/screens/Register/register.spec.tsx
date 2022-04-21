import React from 'react';
import faker from '@faker-js/faker';
import {render, RenderAPI, cleanup} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {ValidationSpy} from '@/presentation/test/mock-validation';
import {AuthenticationSpy} from '@/presentation/test/mock-authentication';
import {Register} from '@/presentation/screens/Register';
import {
  fillIpunt,
  testButtonIsDisabled,
  testButtonIsEnabled,
  testInputIsEmpty,
} from '@/presentation/test/form-helper';

interface SutTypes {
  sut: RenderAPI;
  validationStub: ValidationSpy;
  registrationSpy: AuthenticationSpy;
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationSpy();
  const registrationSpy = new AuthenticationSpy();
  validationStub.error = 'any_error';

  const sut = render(
    <NavigationContainer>
      <Register validation={validationStub} />
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
    validationStub.error = 'Any Error';
    const password = faker.internet.password();
    fillIpunt(sut, 'password-input', password);
    const errorStatus = sut.getByTestId('error-message');
    expect(errorStatus.children).toHaveLength(1);
  });

  test('should enable button if register form is valid', async () => {
    const {sut} = makeSut();
    fillIpunt(sut, 'password-input', faker.random.word());
    fillIpunt(sut, 'email-input', faker.random.word());
    fillIpunt(sut, 'name-input', faker.random.word());
    fillIpunt(sut, 'confirm-password-input', faker.random.word());
    testButtonIsEnabled(sut, 'submit');
  });
});
