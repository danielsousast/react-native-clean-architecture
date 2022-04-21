import faker from '@faker-js/faker';
import {InvalidFieldError} from '@/validation/errors/';
import {CompareFieldsValidation} from './compare-fields-validation';

const makeSut = (valueToCompare: string): CompareFieldsValidation =>
  new CompareFieldsValidation(faker.database.column(), valueToCompare);

describe('CompareFieldsValidation', () => {
  test('should return erro if compare is invalid', () => {
    const sut = makeSut(faker.random.word());
    const error = sut.validate(faker.random.word());
    expect(error).toEqual(new InvalidFieldError());
  });

  test('should return falsy if compare is valid', () => {
    const value = faker.random.word();
    const sut = makeSut(value);
    const error = sut.validate(value);
    expect(error).toBeFalsy();
  });
});
