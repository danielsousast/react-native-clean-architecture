import {FieldValidation} from '@/validation/protocols/field-validation';
import {InvalidFieldError} from '@/validation/errors/';

export class CompareFieldsValidation implements FieldValidation {
  constructor(readonly fieldname: string, readonly valueToCompare: string) {}
  validate(value: string): Error | null {
    return value === this.valueToCompare ? null : new InvalidFieldError();
  }
}
