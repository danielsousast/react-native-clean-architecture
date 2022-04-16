import faker from '@faker-js/faker';
import {RequiredFieldValidation} from '@/validation/validators/required-field';
import {ValidationBuilder} from '@/validation/validators/builder/validation-builder';
import {EmailValidation} from '@/validation/validators/email';
import {MinLengthValidation} from '@/validation/validators/min-length';

describe('ValidationBuilder', () => {
  test('should return RequiredFieldValidation', () => {
    const field = faker.database.column();
    const validations = ValidationBuilder.field(field).required().build();
    expect(validations).toEqual([new RequiredFieldValidation(field)]);
  });

  test('should return EmailValidation', () => {
    const field = faker.database.column();
    const validations = ValidationBuilder.field(field).email().build();
    expect(validations).toEqual([new EmailValidation(field)]);
  });

  test('should return MinLengthValdiation', () => {
    const field = faker.database.column();
    const validations = ValidationBuilder.field(field).min(5).build();
    expect(validations).toEqual([new MinLengthValidation(field, 5)]);
  });

  test('should return a list of valdiations', () => {
    const field = faker.database.column();
    const validations = ValidationBuilder.field(field)
      .required()
      .min(5)
      .email()
      .build();
    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new MinLengthValidation(field, 5),
      new EmailValidation(field),
    ]);
  });
});
