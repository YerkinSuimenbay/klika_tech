export interface IColumn<T> {
  field: string;
  title: string;
  width?: number | string;
  render?: (column: IColumn<T>, item: T) => void;
}
