import React, { FC, useRef } from "react";
import { KonvaNodeComponent, Line } from "react-konva";
import Konva from "konva";
import TLine = Konva.Line;

interface ITriangleShape {
  shapeProps: any;
  onSelect: (e: any) => void;
}

const TriangleShape: FC<ITriangleShape> = ({ onSelect, shapeProps }) => {
  const shapeRef = useRef<KonvaNodeComponent<TLine>>(null);

  return (
    <Line
      onClick={() => onSelect(shapeRef)}
      onTap={() => onSelect(shapeRef)}
      ref={shapeRef}
      {...shapeProps}
      dash={[10, 10]}
      name="triangle"
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
      //     points: [
      //       0,
      //       0,
      //       (node.width() / 2) * scaleX,
      //       node.height() * scaleY,
      //       node.width() * scaleX,
      //       0,
      //     ],
      //     closed: true,
      //
      //     // set minimal value
      //     width: Math.max(node.width() * scaleX),
      //     height: Math.max(node.height() * scaleY),
      //   });
      // }}
    />
  );
};

export default TriangleShape;
