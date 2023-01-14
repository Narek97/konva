import React, { useRef } from "react";
import ConnectPointsWrapper from "./ConnectPointsWrapper";

const Box = ({
  shapeProps,
  setArrows,
  arrows,
  setCurrentZIndex,
  showInstruments,
  connectionArrowStart,
  setConnectionArrowStart,
}: any) => {
  const ref0 = useRef<any>();

  const addArrow = ({ start, end }: any) => {
    setArrows([...arrows, { start, end }]);
  };

  return (
    <div className={"parent"}>
      <div
        id={shapeProps.id}
        className={"child"}
        style={{
          position: "relative",
          width: shapeProps.width,
          height: shapeProps.height,
          left: shapeProps.x,
          top: shapeProps.y,
          visibility: connectionArrowStart ? "visible" : "hidden",
        }}
        ref={ref0}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          if (e.dataTransfer.getData("arrow") === shapeProps.id) {
            console.log(e.dataTransfer.getData("arrow"), shapeProps.id);
          } else {
            const refs = {
              start: e.dataTransfer.getData("arrow"),
              end: shapeProps.id,
            };
            addArrow(refs);
          }
        }}
      />

      {showInstruments && (
        <>
          <ConnectPointsWrapper
            {...{
              boxId: shapeProps.id,
              ref0,
              left: shapeProps.x - 20,
              top: shapeProps.y + shapeProps.height / 2 - 5,
              setCurrentZIndex,
              setConnectionArrowStart,
            }}
          />
          <ConnectPointsWrapper
            {...{
              boxId: shapeProps.id,
              ref0,
              left: shapeProps.x + shapeProps.width + 10,
              top: shapeProps.y + shapeProps.height / 2 - 5,
              setCurrentZIndex,
              setConnectionArrowStart,
            }}
          />
          <ConnectPointsWrapper
            {...{
              boxId: shapeProps.id,
              ref0,
              left: shapeProps.x + shapeProps.width / 2 - 5,
              top: shapeProps.y - 20,
              setCurrentZIndex,
              setConnectionArrowStart,
            }}
          />
          <ConnectPointsWrapper
            {...{
              boxId: shapeProps.id,
              ref0,
              left: shapeProps.x + shapeProps.width / 2 - 5,
              top: shapeProps.y + +shapeProps.height + 10,
              setCurrentZIndex,
              setConnectionArrowStart,
            }}
          />
        </>
      )}
    </div>
  );
};

export default Box;
