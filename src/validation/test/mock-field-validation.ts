import {FieldValidation} from '@/validation/protocols/field-validation';

export class FieldValidationSpy implements FieldValidation {
  error: Error = null as unknown as Error;
  constructor(readonly fieldname: string) {}

  validate(_input: any): Error | null {
    return this.error;
  }
}
