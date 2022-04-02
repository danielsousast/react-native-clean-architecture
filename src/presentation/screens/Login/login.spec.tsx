import React from 'react';
import {
  render,
  RenderAPI,
  fireEvent,
  cleanup,
} from '@testing-library/react-native';
import {Login} from '.';
import {Validation} from '@/presentation/protocols/validation';

interface SutTypes {
  sut: RenderAPI;
  validationSpy: ValidationSpy;
}

class ValidationSpy implements Validation {
  error: string | undefined;
  fieldname: string | undefined;
  fieldvalue: string | undefined;

  validate(fieldname: string, fieldvalue: string): string | undefined {
    this.fieldname = fieldname;
    this.fieldvalue = fieldvalue;
    return this.error;
  }
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
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
    fireEvent(emailInput, 'onChangeText', 'any_email');
    expect(validationSpy.fieldname).toEqual('email');
    expect(validationSpy.fieldvalue).toEqual('any_email');
  });

  test('should call Validation with correct password', () => {
    const {sut, validationSpy} = makeSut();
    const passwordInput = sut.getByTestId('password-input');
    fireEvent(passwordInput, 'onChangeText', 'any_password');
    expect(validationSpy.fieldname).toEqual('password');
    expect(validationSpy.fieldvalue).toEqual('any_password');
  });
});
