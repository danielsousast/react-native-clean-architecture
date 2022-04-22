import {InvalidFieldError} from '@/validation/errors/invalid-field-error';
import {FieldValidation} from '@/validation/protocols/field-validation';

export class EmailValidation implements FieldValidation {
  constructor(readonly fieldname: string) {}
  validate(input: any): Error | null {
    const emailRegex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return !input[this.fieldname] || emailRegex.test(input[this.fieldname])
      ? null
      : new InvalidFieldError();
  }
}
