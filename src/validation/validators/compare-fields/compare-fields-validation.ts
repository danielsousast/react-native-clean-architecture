import {FieldValidation} from '@/validation/protocols/field-validation';
import {InvalidFieldError} from '@/validation/errors/';

export class CompareFieldsValidation implements FieldValidation {
  constructor(readonly fieldname: string, readonly fieldToCompare: string) {}
  validate(input: any): Error | null {
    return input[this.fieldname] === input[this.fieldToCompare]
      ? null
      : new InvalidFieldError();
  }
}
