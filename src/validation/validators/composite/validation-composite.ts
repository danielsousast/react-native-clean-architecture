import {Validation} from '@/presentation/protocols/validation';
import {FieldValidation} from '@/validation/protocols/field-validation';

export class ValidationComposite implements Validation {
  private constructor(private readonly valdiators: FieldValidation[]) {}

  static build(validators: FieldValidation[]): ValidationComposite {
    return new ValidationComposite(validators);
  }

  validate(fieldname: string, input: any): string | undefined {
    const validators = this.valdiators.filter(v => v.fieldname === fieldname);
    for (const validator of validators) {
      const error = validator.validate(input);
      if (error) {
        return error.message;
      }
    }
  }
}
