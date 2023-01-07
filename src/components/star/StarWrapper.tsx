import React, { FC } from "react";
import { newAnnotationAtom } from "../../store/atom/newAnnotation.atom";
import { useRecoilValue } from "recoil";
import { starShapeAtom } from "../../store/atom/starShape.atom";
import StarShape from "./StarShape";

interface IStarWrapper {
  currentShape: string | null;
  onShapeSelect: (e: any) => void;
}

const StarWrapper: FC<IStarWrapper> = ({ currentShape, onShapeSelect }) => {
  const annotation = useRecoilValue(newAnnotationAtom);
  const starShape = useRecoilValue(starShapeAtom);
  const stars =
    currentShape === "star" ? [...annotation, ...starShape] : starShape;

  return (
    <>
      {stars.map((star: any, index: number) => (
        <StarShape
          key={star?.id || index}
          shapeProps={{
            ...star,
            fill: star.fill || "transparent",
            innerRadius: star.width,
            outerRadius: star.width / 2,
            rotation: star.width > 0 ? -180 : 0,
            numPoints: 5,
            height: 0,
            stroke: "black",
          }}
          onSelect={onShapeSelect}
        />
      ))}
    </>
  );
};

export default StarWrapper;
