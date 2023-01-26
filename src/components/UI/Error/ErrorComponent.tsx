import { FC } from "react";

interface IProps {
  message: string;
}

export const ErrorComponent: FC<IProps> = ({ message }) => {
  return (
    <div
      style={{
        width: "80vw",
        height: "100vh",
        fontSize: "3em",
        fontWeight: 600,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto",
        color: "red",
        textAlign: "center",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <h2>Error</h2>
      <p>{message}</p>
    </div>
  );
};
