import {RequiredFieldError} from '@/validation/errors/required-field-error';
import {RequiredFieldValidation} from './required-field-validation';

describe('RequiredFieldValdiation', () => {
  test('should return erro if filed is empty', () => {
    const sut = new RequiredFieldValidation('email');
    const error = sut.validate('');
    expect(error).toEqual(new RequiredFieldError());
  });
});
