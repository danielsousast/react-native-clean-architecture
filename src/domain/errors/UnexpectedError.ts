export class UnexpectedError extends Error {
  constructor() {
    super('Aconteceu um erro. Tente novamente mais tarde');
    this.name = 'UnexpectedError';
  }
}
