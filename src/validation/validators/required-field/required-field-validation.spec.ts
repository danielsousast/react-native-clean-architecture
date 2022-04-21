import faker from '@faker-js/faker';
import {RequiredFieldError} from '@/validation/errors/required-field-error';
import {RequiredFieldValidation} from './required-field-validation';

const makeSut = (): RequiredFieldValidation =>
  new RequiredFieldValidation(faker.database.column());

describe('RequiredFieldValdiation', () => {
  test('should return erro if filed is empty', () => {
    const sut = makeSut();
    const error = sut.validate('');
    expect(error).toEqual(new RequiredFieldError());
  });

  test('should return falsy if filed is not empty', () => {
    const sut = makeSut();
    const error = sut.validate(faker.random.words());
    expect(error).toBeFalsy();
  });
});
