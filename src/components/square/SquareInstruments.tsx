import React from "react";
import "./SquareInstruments.css";

const SquareInstruments = ({ shapeProps }: any) => {
  return (
    <div
      className={"square-instruments"}
      style={{
        position: "absolute",
        left: shapeProps.x,
        top: shapeProps.y - 100,
      }}
    >
      <button>Color</button>
      <button>Text</button>
      <button>Lock</button>
      <button>Copy</button>
      <button>Delete</button>
    </div>
  );
};

export default SquareInstruments;
