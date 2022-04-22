import {FieldValidation} from '@/validation/protocols/field-validation';
import {RequiredFieldError} from '@/validation/errors/required-field-error';

export class RequiredFieldValidation implements FieldValidation {
  constructor(readonly fieldname: string) {}
  validate(input: any): Error | null {
    return input[this.fieldname] ? null : new RequiredFieldError();
  }
}
