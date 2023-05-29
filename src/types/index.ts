export interface IService<T> {
  execute(): Promise<void> | void;
  result?: T;
}
