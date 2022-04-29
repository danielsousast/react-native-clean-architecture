export class ErrorLog {
  static log(description: string, error: Error) {
    if (__DEV__) {
      console.log(description, JSON.stringify(error, null, 2));
    }
  }
}
