import { FC } from "react";
import "./button.scss";

interface IProps {
  label: string | JSX.Element;
  onClick: VoidFunction;
  className?: string;
  // All other props
  [x: string]: any;
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
