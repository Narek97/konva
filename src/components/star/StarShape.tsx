import React, { FC, useRef } from "react";
import { KonvaNodeComponent, Star } from "react-konva";
import Konva from "konva";
import TStar = Konva.Star;

interface IStarShape {
  shapeProps: any;
  onSelect: (e: any) => void;
}

const StarShape: FC<IStarShape> = ({ onSelect, shapeProps }) => {
  const shapeRef = useRef<KonvaNodeComponent<TStar>>(null);

  return (
    <Star
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

export default StarShape;
