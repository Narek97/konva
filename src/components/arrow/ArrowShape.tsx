import React, { FC } from "react";
import { Arrow } from "react-konva";

interface IArrowShape {
  shapeProps: any;
  onSelect: (e: any) => void;
}

const ArrowShape: FC<IArrowShape> = ({ onSelect, shapeProps }) => {
  const { arrowStartPos, arrowEndPos } = shapeProps;

  return (
    <>
      <Arrow
        onClick={onSelect}
        onTap={onSelect}
        points={[
          arrowStartPos.x,
          arrowStartPos.y,
          // (arrowStartPos.x + arrowEndPos.x) / 2,
          // (arrowStartPos.y + arrowEndPos.y) / 2,
          arrowEndPos.x,
          arrowEndPos.y,
        ]}
        pointerLength={20}
        pointerWidth={20}
        lineCap="square"
        lineJoin="round"
        fill="black"
        stroke="black"
        name={"arrow"}
        draggable
      />
    </>
  );
};

export default ArrowShape;
