import {InvalidFieldError} from '@/validation/errors/invalid-field-error';
import faker from '@faker-js/faker';
import {MinLengthValidation} from './min-length-valdiation';

const makeSut = (): MinLengthValidation =>
  new MinLengthValidation(faker.database.column(), 5);

describe('MinLengthValidation', () => {
  test('should retrun error if value length is invalid', () => {
    const sut = makeSut();
    const error = sut.validate(faker.random.alphaNumeric(4));
    expect(error).toEqual(new InvalidFieldError());
  });

  test('should retrun falsy if value length is invalid', () => {
    const sut = makeSut();
    const error = sut.validate(faker.random.alphaNumeric(5));
    expect(error).toBeFalsy();
  });
});
