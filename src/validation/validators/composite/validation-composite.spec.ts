import faker from '@faker-js/faker';
import {FieldValidationSpy} from '@/validation/test/mock-field-validation';
import {ValidationComposite} from './validation-composite';

type SutTypes = {
  sut: ValidationComposite;
  validationsSpy: FieldValidationSpy[];
};
const makeSut = (fieldname: string): SutTypes => {
  const validationsSpy = [
    new FieldValidationSpy(fieldname),
    new FieldValidationSpy(fieldname),
  ];
  const sut = ValidationComposite.build(validationsSpy);
  return {sut, validationsSpy};
};

describe('ValidationComposite', () => {
  test('should return error if any validation fails', () => {
    const fieldname = faker.database.column();
    const firstError = faker.random.words();
    const secondError = faker.random.words();
    const {sut, validationsSpy} = makeSut(fieldname);
    validationsSpy[0].error = new Error(firstError);
    validationsSpy[1].error = new Error(secondError);
    const error = sut.validate(fieldname, {[fieldname]: faker.random.words()});
    expect(error).toBe(firstError);
  });

  test('should return falsy if validation success', () => {
    const fieldname = faker.database.column();
    const {sut} = makeSut(fieldname);
    const error = sut.validate(fieldname, {[fieldname]: faker.random.words()});
    expect(error).toBeFalsy();
  });
});
