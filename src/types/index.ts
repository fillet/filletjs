export interface IService<T> {
  execute(): Promise<void> | void;
  result?: T;
}

export interface IBlock {
  name: string;
  group: IBlockExpression;
  className: string;
  variable: IBlockExpression;
  type: IBlockExpression;
}

export interface IBlockExpression {
  plural: string;
  singular: string;
}

export {};
