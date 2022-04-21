import {ValidationBuilder} from '@/validation/validators/builder/validation-builder';
import {ValidationComposite} from '@/validation/validators/composite/validation-composite';
import {makeLoginValidation} from './login-validation-factory';

describe('LoginValidationFacotry', () => {
  test('should make ValdiationComposite with correct valdiations', () => {
    const composite = makeLoginValidation();
    expect(composite).toEqual(
      ValidationComposite.build([
        ...ValidationBuilder.field('email').required().email().build(),
        ...ValidationBuilder.field('password').required().min(5).build(),
      ]),
    );
  });
});
