import {FieldValidation} from '@/validation/protocols';
import {EmailValidation} from '@/validation/validators/email';
import {MinLengthValidation} from '@/validation/validators/min-length';
import {RequiredFieldValidation} from '@/validation/validators/required-field';

export class ValidationBuilder {
  private constructor(
    private readonly fieldname: string,
    private readonly validations: FieldValidation[],
  ) {}

  static field(fieldname: string): ValidationBuilder {
    return new ValidationBuilder(fieldname, []);
  }

  required(): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.fieldname));
    return this;
  }

  email(): ValidationBuilder {
    this.validations.push(new EmailValidation(this.fieldname));
    return this;
  }

  min(length: number): ValidationBuilder {
    this.validations.push(new MinLengthValidation(this.fieldname, length));
    return this;
  }

  build(): FieldValidation[] {
    return this.validations;
  }
}
