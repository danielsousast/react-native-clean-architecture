export class InvalidFieldError extends Error {
  constructor() {
    super('Valor invalido');
    this.name = 'InvalidFieldError';
  }
}
