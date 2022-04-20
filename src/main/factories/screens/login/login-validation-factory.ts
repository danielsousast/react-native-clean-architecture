import {ValidationBuilder} from '@/validation/validators/builder/validation-builder';
import {ValidationComposite} from '@/validation/validators/composite/validation-composite';

export const makeLoginValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build(),
  ]);
};
