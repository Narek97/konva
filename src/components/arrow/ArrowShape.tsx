import React, { FC, useState } from "react";
import { Arrow, Circle } from "react-konva";
import { useRecoilState } from "recoil";
import { arrowShapeAtom } from "../../store/atom/arrowShape.atom";

interface IArrowShape {
  shapeProps: any;
  onSelect: (e: any) => void;
}

const ArrowShape: FC<IArrowShape> = ({ onSelect, shapeProps }) => {
  const { arrowStartPos, arrowEndPos, id } = shapeProps;
  const [isShowCircle, setIsShowCircle] = useState(false);
  const [arrows, setArrows] = useRecoilState(arrowShapeAtom);

  const onCircleDrag = (e: any, arrowPos: string) => {
    let newArrows = arrows.map((item: any) => {
      if (item.id === id) {
        return {
          ...item,
          [arrowPos]: {
            ...e.target.position(),
          },
        };
      }
      return item;
    });
    setArrows(newArrows);
  };

  const onArrowDrag = (e: any) => {
    let newArrows = arrows.map((item: any) => {
      if (item.id === id) {
        return {
          ...item,
          arrowStartPos: {
            x: arrowStartPos.x + e.target.x(),
            y: arrowStartPos.y + e.target.y(),
          },
          arrowEndPos: {
            x: arrowEndPos.x + e.target.x(),
            y: arrowEndPos.y + e.target.y(),
          },
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
        // onMouseMove={() => setIsShowCircle(false)}
        points={[
          arrowStartPos.x,
          arrowStartPos.y,
          // (arrowStartPos.x + arrowEndPos.x) / 2,
          // (arrowStartPos.y + arrowEndPos.y) / 2,
          arrowEndPos.x,
          arrowEndPos.y,
        ]}
        onDragEnd={onArrowDrag}
        pointerLength={20}
        pointerWidth={20}
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
          {...shapeProps?.arrowStartPos}
          fill="blue"
          width={10}
          height={10}
          draggable
          onMouseUp={() => setIsShowCircle(false)}
          onDragMove={(e) => onCircleDrag(e, "arrowStartPos")}
        />
      )}

      {isShowCircle && (
        <Circle
          id="to"
          {...shapeProps?.arrowEndPos}
          fill="blue"
          width={10}
          height={10}
          draggable
          onMouseUp={() => setIsShowCircle(false)}
          onDragMove={(e) => onCircleDrag(e, "arrowEndPos")}
        />
      )}
    </>
  );
};

export default ArrowShape;
