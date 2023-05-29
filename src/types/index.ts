export interface IService<T> {
  execute(): Promise<void> | void;
  result?: T;
}

export interface IBlock {
  name: string;
  fileName: string;
  group: IBlockExpression;
  className: string;
  variable: IBlockExpression;
  type: IBlockExpression;
}

export interface IBlockExpression {
  plural: string;
  singular: string;
  slice?: string;
}

export {};
