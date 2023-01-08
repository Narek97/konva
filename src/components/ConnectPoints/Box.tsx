import React, { useRef } from "react";
import ConnectPointsWrapper from "./ConnectPointsWrapper";

const Box = ({ shapeProps }: any) => {
  const ref0 = useRef<any>();
  return (
    <div
      className={"aa"}
      id={shapeProps.id}

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
    >
      <div
        style={{
          position: "relative",
          width: shapeProps.width,
          height: shapeProps.height,
          left: shapeProps.x,
          top: shapeProps.y,
          backgroundColor: "red",
          visibility: "hidden",
        }}
        ref={ref0}
      />
      <ConnectPointsWrapper
        {...{
          boxId: shapeProps.id,
          ref0,
          left: shapeProps.x - 20,
          top: shapeProps.y + shapeProps.height / 2 - 5,
        }}
      />
      <ConnectPointsWrapper
        {...{
          boxId: shapeProps.id,
          ref0,
          left: shapeProps.x + shapeProps.width + 10,
          top: shapeProps.y + shapeProps.height / 2 - 5,
        }}
      />
      <ConnectPointsWrapper
        {...{
          boxId: shapeProps.id,
          ref0,
          left: shapeProps.x + shapeProps.width / 2 - 5,
          top: shapeProps.y - 20,
        }}
      />
      <ConnectPointsWrapper
        {...{
          boxId: shapeProps.id,
          ref0,
          left: shapeProps.x + shapeProps.width / 2 - 5,
          top: shapeProps.y + +shapeProps.height + 10,
        }}
      />
    </div>
  );
};

export default Box;
