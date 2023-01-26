import { FC } from "react";
import { Button } from "..";
import "./reset-button.scss";

interface IProps {
  onClick: VoidFunction;
  // All other props
  [x: string]: any;
}

export const ResetButton: FC<IProps> = ({ onClick, ...props }) => {
  return (
    <Button className="reset-btn" label="Reset" onClick={onClick} {...props} />
  );
};
