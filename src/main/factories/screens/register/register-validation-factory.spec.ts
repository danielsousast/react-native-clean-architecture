import {ValidationBuilder as Builder} from '@/validation/validators/builder';
import {ValidationComposite} from '@/validation/validators/composite';
import {makeRegisterValidation} from './register-validation-factory';

describe('RegisterValidationFacotry', () => {
  test('should make ValdiationComposite with correct valdiations', () => {
    const composite = makeRegisterValidation();
    expect(composite).toEqual(
      ValidationComposite.build([
        ...Builder.field('name').required().min(5).build(),
        ...Builder.field('email').required().email().build(),
        ...Builder.field('password').required().min(5).build(),
        ...Builder.field('passworrdConfirmation')
          .required()
          .sameAs('password')
          .build(),
      ]),
    );
  });
});
