import { FC } from "react";
import { Button } from "..";
import "./continue-button.scss";

interface IProps {
  onClick: VoidFunction;
}

export const ContinueButton: FC<IProps> = ({ onClick, ...props }) => {
  return (
    <Button
      className="continue-btn"
      label="Continue"
      onClick={onClick}
      {...props}
    />
  );
};
