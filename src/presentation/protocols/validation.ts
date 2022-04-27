export interface Validation {
  validate(fieldname: string, input: object): string | undefined;
}
