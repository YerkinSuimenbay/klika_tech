import { Order } from "../enums";

export interface TableSort<T> {
  field: T;
  order: Order;
}
