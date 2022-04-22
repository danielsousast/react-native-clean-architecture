export interface FieldValidation {
  fieldname: string;
  validate(input: object): Error | null;
}
