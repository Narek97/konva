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

  const getPoints = (arrow: any) => {
    console.log(arrow);
    const type = () => {
      return Math.abs(arrow.width) < Math.abs(arrow.height) ? 1 : 2;
    };
    const indexY = arrow.height > 0 ? 1 : -1;
    const indexX = arrow.width > 0 ? 1 : 1;
    const points: any = {
      1: [
        0,
        0,
        (arrow.width / 12) * indexY,
        arrow.height / 2 - 30 * indexY,
        arrow.width - (arrow.width / 12) * indexY,
        arrow.height / 2 + 30 * indexY,
        arrow.width,
        arrow.height,
      ],
      2: [
        0,
        0,
        arrow.width / 2 + 30 * indexX,
        (arrow.height / 12) * indexX,
        arrow.width / 2 - 30 * indexX,
        arrow.height - (arrow.height / 12) * indexX,
        arrow.width,
        arrow.height,
      ],
    };
    return points[type()];
  };

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
            points: getPoints(arrow),
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

// const points: any = {
//   1: [
//     0,
//     0,
//     0,
//     arrow.height / 2,
//     arrow.width,
//     arrow.height / 2,
//     arrow.width,
//     arrow.height,
//   ],
//   2: [
//     0,
//     0,
//     arrow.width / 2,
//     0,
//     arrow.width / 2,
//     arrow.height,
//     arrow.width,
//     arrow.height,
//   ],
// };
