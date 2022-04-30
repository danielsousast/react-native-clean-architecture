export class ErrorLog {
  static log(description: string, error: Error) {
    if (__DEV__) {
      //@ts-ignore
      console.tron.log(description, error);
    }
  }
}
