import React from "react";

export const Loader = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        fontSize: "3em",
        fontWeight: 600,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      Loading...
    </div>
  );
};
