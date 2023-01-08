import React, { FC, useRef, useState } from "react";
import { KonvaNodeComponent, Rect } from "react-konva";
import Konva from "konva";
import TRect = Konva.Rect;
import { Html } from "react-konva-utils";
import Box from "../ConnectPoints/Box";
import { useRecoilState } from "recoil";
import { squareShapeAtom } from "../../store/atom/squareShape.atom";
import Box1 from "../ConnectPoints/Box1";

interface ISquareShape {
  shapeProps: any;
  onSelect: (e: any) => void;
}

const SquareShape: FC<ISquareShape> = ({ onSelect, shapeProps }) => {
  const shapeRef = useRef<KonvaNodeComponent<TRect>>(null);

  const [showInstruments, setShowInstruments] = useState(false);
  const [squareShape, setSquareShape] = useRecoilState(squareShapeAtom);

  const onDragMove = (e: any) => {
    let newSquareShapes = squareShape.map((item: any) => {
      if (item.id === shapeProps.id) {
        return {
          ...item,
          x: e.target.x(),
          y: e.target.y(),
        };
      }
      return item;
    });
    setSquareShape(newSquareShapes);
  };

  const onMouseDown = () => {
    setShowInstruments(true);
  };

  return (
    <>
      <Rect
        onClick={() => onSelect(shapeRef)}
        onTap={() => onSelect(shapeRef)}
        // ref={shapeRef.current[getKey]}
        ref={shapeRef}
        {...shapeProps}
        dash={[10, 10]}
        name="square"
        draggable
        onMouseDown={onMouseDown}
        onDragMove={onDragMove}
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
      {showInstruments && (
        <Html>
          <Box shapeProps={shapeProps} />
        </Html>
      )}
    </>
  );
};

export default SquareShape;
