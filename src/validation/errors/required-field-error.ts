export class RequiredFieldError extends Error {
  constructor() {
    super('Campo obrigatorio');
    this.name = 'RequiredFieldError';
  }
}
