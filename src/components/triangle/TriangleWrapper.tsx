import React, { FC } from "react";
import { newAnnotationAtom } from "../../store/atom/newAnnotation.atom";
import { useRecoilValue } from "recoil";
import TriangleShape from "./TriangleShape";
import { triangleShapeAtom } from "../../store/atom/triangleShape.atom";

interface ITriangleWrapper {
  currentShape: string | null;
  onShapeSelect: (e: any) => void;
}

const TriangleWrapper: FC<ITriangleWrapper> = ({
  currentShape,
  onShapeSelect,
}) => {
  const annotation = useRecoilValue(newAnnotationAtom);
  const triangleShape = useRecoilValue(triangleShapeAtom);
  const triangles =
    currentShape === "triangle"
      ? [...annotation, ...triangleShape]
      : triangleShape;

  return (
    <>
      {triangles.map((triangle: any, index: number) => (
        <TriangleShape
          key={triangle?.id || index}
          shapeProps={{
            ...triangle,
            x: triangle.x,
            y: triangle.y,
            points: [
              0,
              0,
              triangle.width / 2,
              triangle.height,
              triangle.width,
              0,
            ],
            closed: true,
            stroke: "black",
          }}
          onSelect={onShapeSelect}
        />
      ))}
    </>
  );
};

export default TriangleWrapper;
