import React from 'react';
import {
  render,
  RenderAPI,
  fireEvent,
  cleanup,
} from '@testing-library/react-native';
import {Login} from '.';
import {ValidationSpy} from '@/presentation/test/mock-validation';
import faker from '@faker-js/faker';

interface SutTypes {
  sut: RenderAPI;
  validationSpy: ValidationSpy;
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  validationSpy.error = 'any_error';
  const sut = render(<Login validation={validationSpy} />);
  return {sut, validationSpy};
};

describe('Login Screen', () => {
  afterEach(cleanup);
  test('should start with initial state', () => {
    const {sut} = makeSut();
    const submit = sut.getByTestId('submit');
    const emailInput = sut.getByTestId('email-input');
    const passwordInput = sut.getByTestId('password-input');

    expect(submit.props.accessibilityState.disabled).toBeTruthy();
    expect(emailInput.props.value).toBe('');
    expect(passwordInput.props.value).toBe('');
  });

  test('should call Validation with correct email', () => {
    const {sut, validationSpy} = makeSut();
    const emailInput = sut.getByTestId('email-input');
    const email = faker.internet.email();
    fireEvent(emailInput, 'onChangeText', email);
    expect(validationSpy.fieldname).toEqual('email');
    expect(validationSpy.fieldvalue).toEqual(email);
  });

  test('should call Validation with correct password', () => {
    const {sut, validationSpy} = makeSut();
    const passwordInput = sut.getByTestId('password-input');
    const password = faker.internet.password();
    fireEvent(passwordInput, 'onChangeText', password);
    expect(validationSpy.fieldname).toEqual('password');
    expect(validationSpy.fieldvalue).toEqual(password);
  });

  test('should present error if fields is invalid', () => {
    const {sut} = makeSut();
    const passwordInput = sut.getByTestId('password-input');
    const password = faker.internet.password();
    fireEvent(passwordInput, 'onChangeText', password);
    const errorStatus = sut.getByTestId('error-message');
    expect(errorStatus.children).toHaveLength(1);
  });
});
