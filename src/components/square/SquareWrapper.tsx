import React, { FC } from "react";
import { newAnnotationAtom } from "../../store/atom/newAnnotation.atom";
import { useRecoilValue } from "recoil";
import SquareShape from "./SquareShape";
import { squareShapeState } from "../../store/atom/squareShape.atom";

interface ISquareWrapper {
  currentShape: string | null;
  onShapeSelect: (e: any) => void;
}

const SquareWrapper: FC<ISquareWrapper> = ({ currentShape, onShapeSelect }) => {
  const annotation = useRecoilValue(newAnnotationAtom);
  const squareShape = useRecoilValue(squareShapeState);
  const squares =
    currentShape === "square" ? [...annotation, ...squareShape] : squareShape;

  return (
    <>
      {squares.map((square: any, index: number) => (
        <SquareShape
          key={square?.id || index}
          shapeProps={{ ...square, stroke: "black" }}
          onSelect={onShapeSelect}
        />
      ))}
    </>
  );
};

export default SquareWrapper;
