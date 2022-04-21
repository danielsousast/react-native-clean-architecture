export class EmailInUseError extends Error {
  constructor() {
    super('Email em uso');
    this.name = 'EmailInUseError';
  }
}
