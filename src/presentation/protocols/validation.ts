export interface Validation {
  validate(fieldname: string, input: any): string | undefined;
}
