import React from "react";
import { useRecoilState } from "recoil";
import { squareShapeState } from "../store/atom/squareShape.atom";
import { triangleShapeState } from "../store/atom/triangleShapeState";

interface IUseCreateShapes {
  sx: number;
  sy: number;
  x: number;
  y: number;
}

const useCreateShapes = () => {
  const [squareShape, setSquareShapeState] = useRecoilState(squareShapeState);
  const [triangleShape, setTriangleShapeState] =
    useRecoilState(triangleShapeState);

  const createRect = ({ sx, sy, x, y }: IUseCreateShapes) => {
    const annotation = {
      x: sx,
      y: sy,
      width: x - sx,
      height: y - sy,
      key: squareShape.length + 1,
      fill: "green",
      strokeWidth: 0,
      id: Date.now().toString(),
    };
    setSquareShapeState([...squareShape, annotation]);
  };

  const createTriangle = ({ sx, sy, x, y }: IUseCreateShapes) => {
    const annotation = {
      x: sx,
      y: sy,
      width: x - sx,
      height: y - sy,
      points: [0, 0, x - sx / 2, y - sy, x - sx, 0],
      closed: true,
      key: triangleShape.length + 1,
      fill: "blue",
      strokeWidth: 0,
      id: new Date().toLocaleTimeString().toString(),
    };
    setTriangleShapeState([...triangleShape, annotation]);
  };

  return { createRect, createTriangle };
};

export default useCreateShapes;
