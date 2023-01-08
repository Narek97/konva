import React, { useRef, useState } from "react";
import Xarrow from "react-xarrows";

const connectPointStyle: any = {
  position: "absolute",
  width: 10,
  height: 10,
  borderRadius: "50%",
  background: "black",
};

// const connectPointOffset: any = {
//   left: { left: 0, top: "50%", transform: "translate(-118%, -50%)" },
//   right: { left: "104%", top: "50%", transform: "translate(-50%, -50%)" },
//   top: { left: "50%", top: 0, transform: "translate(-50%, -118%)" },
//   bottom: { left: "50%", top: "104%", transform: "translate(-50%, -50%)" },
// };

const ConnectPointsWrapper = ({
  boxId,
  handler,
  ref0,
  left,
  top,
  setCurrentZIndex,
}: any) => {
  const ref1 = useRef<any>();

  const [position, setPosition] = useState({});
  const [beingDragged, setBeingDragged] = useState(false);

  return (
    <React.Fragment>
      <div
        className="connectPoint"
        style={{
          ...connectPointStyle,
          // ...connectPointOffset[handler],
          left,
          top,
          ...position,
        }}
        draggable
        onDragStart={(e) => {
          setCurrentZIndex(0);
          setBeingDragged(true);
          e.dataTransfer.setData("arrow", boxId);
        }}
        onDrag={(e) => {
          setPosition({
            position: "fixed",
            left: e.clientX - 25,
            top: e.clientY - 115,
            transform: "none",
            opacity: 0,
          });
        }}
        ref={ref1}
        onDragEnd={(e) => {
          setCurrentZIndex(10);
          setPosition({});
          e.dataTransfer.setData("arrow", "");
          setBeingDragged(false);
        }}
      />
      {beingDragged ? <Xarrow start={ref0} end={ref1} /> : null}
    </React.Fragment>
  );
};

export default ConnectPointsWrapper;
