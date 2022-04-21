import React from 'react';
import {render, RenderAPI, cleanup} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {ValidationSpy} from '@/presentation/test/mock-validation';
import {AuthenticationSpy} from '@/presentation/test/mock-authentication';
import {Register} from '@/presentation/screens/Register';
import {FormHelper} from '@/presentation/test';

interface SutTypes {
  sut: RenderAPI;
  validationSpy: ValidationSpy;
  registrationSpy: AuthenticationSpy;
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const registrationSpy = new AuthenticationSpy();
  validationSpy.error = 'any_error';

  const sut = render(
    <NavigationContainer>
      <Register validation={validationSpy} />
    </NavigationContainer>,
  );
  return {sut, validationSpy, registrationSpy};
};

describe('Login Screen', () => {
  afterEach(cleanup);
  test('should start with initial state', async () => {
    const {sut} = makeSut();
    FormHelper.testInputIsEmpty(sut, 'name-input');
    FormHelper.testInputIsEmpty(sut, 'email-input');
    FormHelper.testInputIsEmpty(sut, 'password-input');
    FormHelper.testInputIsEmpty(sut, 'confirm-password-input');
    FormHelper.testButtonIsDisabled(sut, 'submit');
  });
});
