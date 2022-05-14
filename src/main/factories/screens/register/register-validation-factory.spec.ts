import {
  CompareFieldsValidation,
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation,
} from '@/validation/validators';
import {ValidationComposite} from '@/validation/validators/composite';
import {makeRegisterValidation} from './register-validation-factory';

describe('RegisterValidationFacotry', () => {
  test('should make ValdiationComposite with correct valdiations', () => {
    const composite = makeRegisterValidation();
    expect(composite).toEqual(
      ValidationComposite.build([
        new RequiredFieldValidation('name'),
        new MinLengthValidation('name', 5),
        new RequiredFieldValidation('email'),
        new EmailValidation('email'),
        new RequiredFieldValidation('password'),
        new MinLengthValidation('password', 5),
        new RequiredFieldValidation('passworrdConfirmation'),
        new CompareFieldsValidation('passworrdConfirmation', 'password'),
      ]),
    );
  });
});
