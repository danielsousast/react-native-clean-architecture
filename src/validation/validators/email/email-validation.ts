import {InvalidFieldError} from '@/validation/errors/invalid-field-error';
import {FieldValidation} from '@/validation/protocols/field-validation';

export class EmailValidation implements FieldValidation {
  constructor(readonly fieldname: string) {}
  validate(_value: string): Error | null {
    return new InvalidFieldError();
  }
}
