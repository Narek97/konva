import React, { useRef } from "react";
import ConnectPointsWrapper from "./ConnectPointsWrapper";

const Box1 = ({ id, ref, left, top }: any) => {
  const ref0 = useRef<any>();

  return (
    <div
      id={id}
      style={{
        position: "relative",
        width: 12,
        height: 12,
        left,
        top,
        backgroundColor: "red",
      }}
      ref={ref}
      // onDragOver={(e) => e.preventDefault()}
      // onDrop={(e) => {
      //   if (e.dataTransfer.getData("arrow") === boxId) {
      //     console.log(e.dataTransfer.getData("arrow"), boxId);
      //   } else {
      //     const refs = { start: e.dataTransfer.getData("arrow"), end: boxId };
      //     addArrow(refs);
      //     console.log("droped!", refs);
      //   }
      // }}
    ></div>
  );
};

export default Box1;
