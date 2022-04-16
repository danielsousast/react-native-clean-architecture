import {InvalidFieldError} from '@/validation/errors/invalid-field-error';
import {MinLengthValidation} from './min-length-valdiation';

describe('MinLengthValidation', () => {
  test('should retrun error if value length is invalid', () => {
    const sut = new MinLengthValidation('field', 10);
    const error = sut.validate('123');
    expect(error).toEqual(new InvalidFieldError());
  });

  test('should retrun falsy if value length is invalid', () => {
    const sut = new MinLengthValidation('field', 5);
    const error = sut.validate('12345');
    expect(error).toBeFalsy();
  });
});
