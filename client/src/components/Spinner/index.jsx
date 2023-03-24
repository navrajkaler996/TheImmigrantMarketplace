import React from "react";
import { HashLoader } from "react-spinners";

const Spinner = ({ color = "#fff" }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        width: "fit-content",
        // height: "100vh",
      }}
      >
      <HashLoader color={color} />
    </div>
  );
};

export default Spinner;
