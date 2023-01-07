import React, { FC } from "react";
import { newAnnotationAtom } from "../../store/atom/newAnnotation.atom";
import { useRecoilValue } from "recoil";
import { ellipseShapeAtom } from "../../store/atom/ellipseShape.atom";
import EllipseShape from "./EllipseShape";

interface IEllipseWrapper {
  currentShape: string | null;
  onShapeSelect: (e: any) => void;
}

const EllipseWrapper: FC<IEllipseWrapper> = ({
  currentShape,
  onShapeSelect,
}) => {
  const annotation = useRecoilValue(newAnnotationAtom);
  const ellipseShape = useRecoilValue(ellipseShapeAtom);
  const ellipses =
    currentShape === "ellipse"
      ? [...annotation, ...ellipseShape]
      : ellipseShape;

  return (
    <>
      {ellipses.map((ellipse: any, index: number) => (
        <EllipseShape
          key={ellipse?.id || index}
          shapeProps={{
            ...ellipse,
            radiusX: Math.abs(ellipse.width),
            radiusY: Math.abs(ellipse.height),
            stroke: "black",
          }}
          onSelect={onShapeSelect}
        />
      ))}
    </>
  );
};

export default EllipseWrapper;
