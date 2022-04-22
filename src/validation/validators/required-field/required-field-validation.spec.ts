import faker from '@faker-js/faker';
import {RequiredFieldError} from '@/validation/errors/required-field-error';
import {RequiredFieldValidation} from './required-field-validation';

const makeSut = (field: string): RequiredFieldValidation =>
  new RequiredFieldValidation(field);

describe('RequiredFieldValdiation', () => {
  test('should return erro if filed is empty', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({
      [field]: '',
    });
    expect(error).toEqual(new RequiredFieldError());
  });

  test('should return falsy if filed is not empty', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({[field]: faker.random.words()});
    expect(error).toBeFalsy();
  });
});
