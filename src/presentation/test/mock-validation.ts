import {Validation} from '@/presentation/protocols/validation';

export class ValidationSpy implements Validation {
  error: string | undefined;
  fieldname: string | undefined;
  fieldvalue: string | undefined;

  validate(fieldname: string, fieldvalue: string): string | undefined {
    this.fieldname = fieldname;
    this.fieldvalue = fieldvalue;
    return this.error;
  }
}
