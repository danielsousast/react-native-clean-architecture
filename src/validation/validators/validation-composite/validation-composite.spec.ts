import {FieldValidationSpy} from '../test/mock-field-validation';
import {ValidationComposite} from './validation-composite';

describe('ValidationComposite', () => {
  test('should return error if any validation fails', () => {
    const fieldValidationSpy = new FieldValidationSpy('any_field');
    const fieldValidationSpy2 = new FieldValidationSpy('second_any_field');
    fieldValidationSpy.error = new Error('first_any_error');
    fieldValidationSpy2.error = new Error('second_any_error');
    const sut = new ValidationComposite([
      fieldValidationSpy,
      fieldValidationSpy2,
    ]);
    const error = sut.validate('any_field', 'any_value');
    expect(error).toBe('first_any_error');
  });
});
