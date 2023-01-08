import React, { FC, useRef } from "react";
import { KonvaNodeComponent, Rect } from "react-konva";
import Konva from "konva";
import TRect = Konva.Rect;
import { useRecoilState } from "recoil";
import { squareShapeAtom } from "../../store/atom/squareShape.atom";

interface IGroupShape {
  shapeProps: any;
  onSelect: (e: any) => void;
}

const GroupShape: FC<IGroupShape> = ({ onSelect, shapeProps }) => {
  const shapeRef = useRef<KonvaNodeComponent<TRect>>(null);
  const [squareShape, setGroupShape] = useRecoilState(squareShapeAtom);

  const onDragMove = (e: any) => {
    let newGroupShapes = squareShape.map((item: any) => {
      if (item.id === shapeProps.id) {
        return {
          ...item,
          x: e.target.x(),
          y: e.target.y(),
        };
      }
      return item;
    });
    setGroupShape(newGroupShapes);
  };

  return (
    <>
      <Rect
        ref={shapeRef}
        draggable
        onDragMove={onDragMove}
        onMouseMove={() => onSelect(shapeRef)}
        onMouseLeave={() => onSelect(null)}
        onClick={() => onSelect(shapeRef)}
        onTap={() => onSelect(shapeRef)}
        name="group"
        {...shapeProps}
      />
    </>
  );
};

export default GroupShape;
