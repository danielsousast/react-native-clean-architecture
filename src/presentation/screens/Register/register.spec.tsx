import React from 'react';
import {render, RenderAPI, cleanup} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {ValidationStub} from '@/presentation/test/mock-validation';
import {AuthenticationSpy} from '@/presentation/test/mock-authentication';
import {Register} from '@/presentation/screens/Register';
import {
  fillIpunt,
  simulateSubmit,
  testButtonIsDisabled,
  testButtonIsEnabled,
  testIfIsLoading,
  testInputIsEmpty,
} from '@/presentation/test/form-helper';
import faker from '@faker-js/faker';

interface SutTypes {
  sut: RenderAPI;
  validationStub: ValidationStub;
  registrationSpy: AuthenticationSpy;
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub();
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
});
