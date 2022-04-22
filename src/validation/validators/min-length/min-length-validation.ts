import {InvalidFieldError} from '@/validation/errors/invalid-field-error';
import {FieldValidation} from '@/validation/protocols/field-validation';

export class MinLengthValidation implements FieldValidation {
  constructor(readonly fieldname: string, private readonly minLength: number) {}

  validate(input: any): Error | null {
    return input[this.fieldname]?.length < this.minLength
      ? new InvalidFieldError()
      : null;
  }
}
