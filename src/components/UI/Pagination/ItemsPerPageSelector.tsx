import { FC } from "react";

import "./pagination.scss";

export enum ItemsPerPageEnum {
  ten = 10,
  twenty_five = 25,
  fifty = 50,
  hundred = 100,
}

export const ItemsPerPageSelector: FC = () => {
  const values = Object.values(ItemsPerPageEnum).filter(
    (v) => !isNaN(Number(v))
  );
  return (
    <div className="items-per-page-selector">
      {values.map((itemPerPage) => {
        return <button>{itemPerPage}</button>;
      })}
    </div>
  );
};
