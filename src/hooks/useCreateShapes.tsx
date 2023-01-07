import React from "react";
import { useRecoilState } from "recoil";
import { squareShapeState } from "../store/atom/squareShape.atom";

interface IUseCreateShapes {
  sx: number;
  sy: number;
  x: number;
  y: number;
}

const useCreateShapes = () => {
  const [squareShape, setSquareShapeState] = useRecoilState(squareShapeState);

  const createRect = ({ sx, sy, x, y }: IUseCreateShapes) => {
    const annotationToAdd = {
      x: sx,
      y: sy,
      width: x - sx,
      height: y - sy,
      key: squareShape.length + 1,
      fill: "green",
      strokeWidth: 0,
      id: Date.now().toString(),
    };
    setSquareShapeState([...squareShape, annotationToAdd]);
  };

  return { createRect };
};

export default useCreateShapes;
