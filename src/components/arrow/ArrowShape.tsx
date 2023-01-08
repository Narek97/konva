import React, { FC, useState } from "react";
import { Arrow, Circle } from "react-konva";
import { useRecoilState } from "recoil";
import { arrowShapeAtom } from "../../store/atom/arrowShape.atom";

interface IArrowShape {
  shapeProps: any;
  onSelect: (e: any) => void;
}

const ArrowShape: FC<IArrowShape> = ({ onSelect, shapeProps }) => {
  const [isShowCircle, setIsShowCircle] = useState(false);
  const [arrows, setArrows] = useRecoilState(arrowShapeAtom);

  const onCircleFromDrag = (e: any) => {
    let newArrows = arrows.map((item: any) => {
      if (item.id === shapeProps.id) {
        return {
          ...item,
          x: e.target.x(),
          y: e.target.y(),
          width: shapeProps.x1 + shapeProps.x - e.target.x(),
          height: shapeProps.y1 + shapeProps.y - e.target.y(),
        };
      }
      return item;
    });
    setArrows(newArrows);
  };

  const onCircleToDrag = (e: any) => {
    let newArrows = arrows.map((item: any) => {
      if (item.id === shapeProps.id) {
        return {
          ...item,
          width: e.target.x() - shapeProps.x,
          height: e.target.y() - shapeProps.y,
        };
      }
      return item;
    });
    setArrows(newArrows);
  };

  const onArrowDrag = (e: any) => {
    setIsShowCircle(false);
    let newArrows = arrows.map((item: any) => {
      if (item.id === shapeProps.id) {
        return {
          ...item,
          x: e.target.x(),
          y: e.target.y(),
        };
      }
      return item;
    });
    setArrows(newArrows);
  };

  return (
    <>
      <Arrow
        onClick={onSelect}
        onTap={onSelect}
        onMouseDown={() => setIsShowCircle(true)}
        {...shapeProps}
        onDragMove={onArrowDrag}
        pointerLength={20}
        pointerWidth={20}
        curved
        lineCap="square"
        lineJoin="round"
        fill="black"
        stroke="black"
        name={"arrow"}
        draggable
      />
      {isShowCircle && (
        <Circle
          id="from"
          fill="blue"
          width={10}
          height={10}
          x={shapeProps.x}
          y={shapeProps.y}
          draggable
          onMouseUp={() => setIsShowCircle(false)}
          onDragMove={onCircleFromDrag}
        />
      )}

      {isShowCircle && (
        <Circle
          id="to"
          fill="blue"
          width={10}
          height={10}
          x={shapeProps.x + shapeProps.x1}
          y={shapeProps.y + shapeProps.y1}
          draggable
          onMouseUp={() => setIsShowCircle(false)}
          onDragMove={onCircleToDrag}
        />
      )}
    </>
  );
};

export default ArrowShape;
