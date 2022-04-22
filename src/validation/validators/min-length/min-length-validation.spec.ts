import {InvalidFieldError} from '@/validation/errors/invalid-field-error';
import faker from '@faker-js/faker';
import {MinLengthValidation} from './min-length-validation';

const makeSut = (field: string): MinLengthValidation =>
  new MinLengthValidation(field, 5);

describe('MinLengthValidation', () => {
  test('should retrun error if value length is invalid', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({[field]: faker.random.alphaNumeric(4)});
    expect(error).toEqual(new InvalidFieldError());
  });

  test('should retrun falsy if value length is invalid', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({[field]: faker.random.alphaNumeric(5)});
    expect(error).toBeFalsy();
  });

  test('should retrun falsy if field does not exits in screen', () => {
    const sut = makeSut(faker.database.column());
    const error = sut.validate({
      [faker.database.column()]: faker.random.alphaNumeric(5),
    });
    expect(error).toBeFalsy();
  });
});
