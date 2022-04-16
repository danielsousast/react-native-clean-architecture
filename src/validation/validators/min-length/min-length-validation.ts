import {InvalidFieldError} from '@/validation/errors/invalid-field-error';
import {FieldValidation} from '@/validation/protocols/field-validation';

export class MinLengthValidation implements FieldValidation {
  constructor(readonly fieldname: string, private readonly minLength: number) {}

  validate(value: string): Error | null {
    return value.length >= this.minLength ? null : new InvalidFieldError();
  }
}
