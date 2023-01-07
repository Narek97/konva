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
          shapeProps={arrow}
          onSelect={onShapeSelect}
        />
      ))}
    </>
  );
};

export default ArrowWrapper;
