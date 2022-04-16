import {InvalidFieldError} from '@/validation/errors/invalid-field-error';
import {EmailValidation} from './email-validation';

describe('EmailValidation', () => {
  test('should return error if email is invalid', () => {
    const sut = new EmailValidation('any_email');
    const error = sut.validate('');
    expect(error).toEqual(new InvalidFieldError());
  });
});
