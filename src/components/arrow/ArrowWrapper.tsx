import React, { FC } from "react";
import { newAnnotationAtom } from "../../store/atom/newAnnotation.atom";
import { useRecoilValue } from "recoil";
import ArrowShape from "./ArrowShape";
import { arrowShapeAtom } from "../../store/atom/arrowShape.atom";

interface IArrowWrapper {
  currentShape: string | null;
  onShapeSelect: (e: any) => void;
}

const ArrowWrapper: FC<IArrowWrapper> = ({ currentShape, onShapeSelect }) => {
  const annotation = useRecoilValue(newAnnotationAtom);
  const arrowShape = useRecoilValue(arrowShapeAtom);
  const arrows =
    currentShape === "arrow" ? [...annotation, ...arrowShape] : arrowShape;

  return (
    <>
      {arrows.map((arrow: any, index: number) => (
        <ArrowShape
          key={arrow?.id || index}
          shapeProps={{
            // ...arrow,
            id: arrow.id,
            x: arrow.x,
            y: arrow.y,
            x1: arrow.width,
            y1: arrow.height,
            points: [0, 0, arrow.width, arrow.height],
            // closed: true,
            stroke: "black",
          }}
          onSelect={onShapeSelect}
        />
      ))}
    </>
  );
};

export default ArrowWrapper;
