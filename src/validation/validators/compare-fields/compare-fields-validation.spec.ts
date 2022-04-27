import faker from '@faker-js/faker';
import {InvalidFieldError} from '@/validation/errors/';
import {CompareFieldsValidation} from './compare-fields-validation';

const makeSut = (
  field: string,
  fieldToCompare: string,
): CompareFieldsValidation =>
  new CompareFieldsValidation(field, fieldToCompare);

describe('CompareFieldsValidation', () => {
  test('should return error if compare is invalid', () => {
    const field = faker.random.words();
    const fieldToCompare = faker.database.column();
    const sut = makeSut(field, fieldToCompare);
    const error = sut.validate({
      [field]: faker.random.words(4),
      [fieldToCompare]: faker.random.words(6),
    });
    expect(error).toEqual(new InvalidFieldError());
  });

  test('should return falsy if compare is valid', () => {
    const field = faker.database.column();
    const fieldToCompare = faker.database.column();
    const value = faker.random.word();
    const sut = makeSut(field, fieldToCompare);
    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: value,
    });
    expect(error).toBeFalsy();
  });
});
