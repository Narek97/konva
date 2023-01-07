import React, { FC } from "react";
import { newAnnotationAtom } from "../../store/atom/newAnnotation.atom";
import { useRecoilValue } from "recoil";
import { roundSquareShapeAtom } from "../../store/atom/roundSquareShape.atom";
import RoundSquareShape from "./roundSquareShape";

interface IRoundSquareWrapper {
  currentShape: string | null;
  onShapeSelect: (e: any) => void;
}

const RoundSquareWrapper: FC<IRoundSquareWrapper> = ({
  currentShape,
  onShapeSelect,
}) => {
  const annotation = useRecoilValue(newAnnotationAtom);
  const roundSquareShape = useRecoilValue(roundSquareShapeAtom);
  const roundSquares =
    currentShape === "roundSquare"
      ? [...annotation, ...roundSquareShape]
      : roundSquareShape;

  return (
    <>
      {roundSquares.map((roundSquare: any, index: number) => (
        <RoundSquareShape
          key={roundSquare?.id || index}
          shapeProps={{
            x: roundSquare.x,
            y: roundSquare.y,
            width: Math.abs(roundSquare.width),
            height: Math.abs(roundSquare.height),
            cornerRadius: 10,
            fill: roundSquare.fill || "transparent",
            strokeWidth: roundSquare.strokeWidth,
            stroke: "black",
          }}
          onSelect={onShapeSelect}
        />
      ))}
    </>
  );
};

export default RoundSquareWrapper;
