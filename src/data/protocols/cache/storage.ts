export interface Storage {
  set(key: string, value: any): void;
  get(key: string): Promise<any>;
  clear(key: string): Promise<void>;
}
