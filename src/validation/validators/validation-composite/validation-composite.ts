import {Validation} from '@/presentation/protocols/validation';
import {FieldValidation} from '@/validation/protocols/field-validation';

export class ValidationComposite implements Validation {
  constructor(private readonly valdiators: FieldValidation[]) {}
  validate(fieldname: string, fieldvalue: string): string | undefined {
    const validators = this.valdiators.filter(v => v.fieldname === fieldname);
    for (const validator of validators) {
      const error = validator.validate(fieldvalue);
      if (error) {
        return error.message;
      }
    }
  }
}
