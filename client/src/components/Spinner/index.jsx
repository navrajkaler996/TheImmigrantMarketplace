import React from "react";
import { HashLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        width: "fit-content",
        // height: "100vh",
      }}>
      <HashLoader color="#fff" />
    </div>
  );
};

export default Spinner;
