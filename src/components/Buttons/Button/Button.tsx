import { FC } from "react";
import "./button.scss";

interface IProps {
  label: string;
  onClick: VoidFunction;
  className?: string;
}

export const Button: FC<IProps> = ({
  label = "Button",
  onClick,
  className,
  ...props
}) => {
  const classNames = className ? `btn ${className}` : "btn";

  return (
    <button className={classNames} onClick={onClick} {...props}>
      {label}
    </button>
  );
};
