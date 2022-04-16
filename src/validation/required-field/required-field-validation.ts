import {FieldValidation} from '@/validation/protocols/field-validation';
import {RequiredFieldError} from '@/validation/errors/required-field-error';

export class RequiredFieldValidation implements FieldValidation {
  constructor(readonly fieldname: string) {}
  validate(value: string): Error | null {
    return value ? null : new RequiredFieldError();
  }
}
