import React, { FC, useRef } from "react";
import { KonvaNodeComponent, Rect } from "react-konva";
import Konva from "konva";
import TRect = Konva.Rect;
import { useSetRecoilState } from "recoil";
import { squareShapeState } from "../../store/atom/squareShape.atom";

interface ISquareShape {
  shapeProps: any;
  onSelect: (e: any) => void;
}

const SquareShape: FC<ISquareShape> = ({ onSelect, shapeProps }) => {
  const shapeRef = useRef<KonvaNodeComponent<TRect>>(null);
  const setSquareShapeState = useSetRecoilState(squareShapeState);

  return (
    <Rect
      onClick={() => onSelect(shapeRef)}
      onTap={() => onSelect(shapeRef)}
      // ref={shapeRef.current[getKey]}
      ref={shapeRef}
      {...shapeProps}
      dash={[10, 10]}
      name="square"
      draggable
      // onDragEnd={(e) => {
      //   onChange({
      //     ...shapeProps,
      //     x: e.target.x(),
      //     y: e.target.y(),
      //   });
      // }}
      // onTransformEnd={(e) => {
      //   const node: any = shapeRef.current;
      //   const scaleX = node.scaleX();
      //   const scaleY = node.scaleY();
      //   // we will reset it back
      //   node.scaleX(1);
      //   node.scaleY(1);
      //   onChange({
      //     ...shapeProps,
      //     x: node.x(),
      //     y: node.y(),
      //     // set minimal value
      //     width: Math.max(5, node.width() * scaleX),
      //     height: Math.max(node.height() * scaleY),
      //   });
      // }}
    />
  );
};

export default SquareShape;
