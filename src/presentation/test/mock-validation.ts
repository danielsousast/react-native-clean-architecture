import {Validation} from '@/presentation/protocols/validation';

export class ValidationStub implements Validation {
  error: string | undefined;
  fieldname: string | undefined;
  fieldvalue: string | undefined;

  validate(fieldname: string, input: any): string | undefined {
    this.fieldname = fieldname;
    this.fieldvalue = input[fieldname];
    return this.error;
  }
}
