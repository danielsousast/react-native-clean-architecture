export interface FieldValidation {
  fieldname: string;
  validate(value: string): Error | null;
}
