import {
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation,
} from '@/validation/validators';
import {ValidationComposite} from '@/validation/validators/composite';
import {makeLoginValidation} from './login-validation-factory';

describe('LoginValidationFacotry', () => {
  test('should make ValdiationComposite with correct valdiations', () => {
    const composite = makeLoginValidation();
    expect(composite).toEqual(
      ValidationComposite.build([
        new RequiredFieldValidation('email'),
        new EmailValidation('email'),
        new RequiredFieldValidation('password'),
        new MinLengthValidation('password', 5),
      ]),
    );
  });
});
