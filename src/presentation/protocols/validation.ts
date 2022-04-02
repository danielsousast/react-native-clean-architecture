export interface Validation {
  validate(fieldname: string, fieldvalue: string): string | undefined;
}
