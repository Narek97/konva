import React, { FC, useRef, useState } from "react";
import { KonvaNodeComponent, Rect } from "react-konva";
import Konva from "konva";
import TRect = Konva.Rect;
import { useRecoilState } from "recoil";
import { squareShapeAtom } from "../../store/atom/squareShape.atom";
import { Html } from "react-konva-utils";
import { connectionArrowAtom } from "../../store/atom/connectionArrow.atom";
import Box from "../ConnectPoints/Box";
import { connectionArrowStartAtom } from "../../store/atom/connectionArrowStart.atom";

interface ISquareShape {
  shapeProps: any;
  onSelect: (e: any) => void;
}

const SquareShape: FC<ISquareShape> = ({ onSelect, shapeProps }) => {
  const shapeRef = useRef<KonvaNodeComponent<TRect>>(null);
  const [currentZIndex, setCurrentZIndex] = useState(10);
  const [showInstruments, setShowInstruments] = useState(false);
  const [isMouseMove, setIsMouseMove] = useState(false);
  const [arrows, setArrows] = useRecoilState(connectionArrowAtom);
  const [squareShape, setSquareShape] = useRecoilState(squareShapeAtom);
  const [connectionArrowStart, setConnectionArrowStart] = useRecoilState(
    connectionArrowStartAtom
  );

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
    setIsMouseMove(true);
  };
  const onMouseUp = () => {
    isMouseMove ? setIsMouseMove(false) : setShowInstruments((prev) => !prev);
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
        onMouseUp={onMouseUp}
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

      <Html
        divProps={{
          style: {
            zIndex: currentZIndex + 20,
            width: 0,
            height: 0,
          },
        }}
      >
        <Box
          shapeProps={shapeProps}
          setArrows={setArrows}
          arrows={arrows}
          showInstruments={showInstruments}
          setCurrentZIndex={setCurrentZIndex}
          connectionArrowStart={connectionArrowStart}
          setConnectionArrowStart={setConnectionArrowStart}
        />
      </Html>
    </>
  );
};

export default SquareShape;
