import { FC } from "react";

interface IProps {
  label: number | string | JSX.Element;
  className?: string;
  onClick?: (pageNumber: number) => void;
}

export const PaginationButton: FC<IProps> = ({
  label,
  className,
  onClick,
  ...props
}) => {
  let classNames = "pagination__button";

  if (className) {
    classNames += ` ${className}`;
  }

  const handleClick = () => {
    onClick && typeof label === "number" && onClick(label);
  };

  return (
    <button className={classNames} onClick={handleClick} {...props}>
      {label}
    </button>
  );
};
