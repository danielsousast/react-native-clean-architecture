import {ValidationBuilder as Builder} from '@/validation/validators/builder/validation-builder';
import {ValidationComposite as Composite} from '@/validation/validators/composite/validation-composite';

export const makeRegisterValidation = (): Composite => {
  return Composite.build([
    ...Builder.field('name').required().min(5).build(),
    ...Builder.field('email').required().email().build(),
    ...Builder.field('password').required().min(5).build(),
    ...Builder.field('passworrdConfirmation')
      .required()
      .sameAs('password')
      .build(),
  ]);
};
