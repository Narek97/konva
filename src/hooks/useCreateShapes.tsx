import React from "react";
import { useRecoilState } from "recoil";
import { squareShapeAtom } from "../store/atom/squareShape.atom";
import { triangleShapeAtom } from "../store/atom/triangleShape.atom";
import { ellipseShapeAtom } from "../store/atom/ellipseShape.atom";

interface IUseCreateShapes {
  sx: number;
  sy: number;
  x: number;
  y: number;
}

const useCreateShapes = () => {
  const [squareShape, setSquareShapeState] = useRecoilState(squareShapeAtom);
  const [triangleShape, setTriangleShapeState] =
    useRecoilState(triangleShapeAtom);
  const [ellipseShape, setEllipseShape] = useRecoilState(ellipseShapeAtom);

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

  const createEllipse = ({ sx, sy, x, y }: IUseCreateShapes) => {
    const annotation = {
      x: sx,
      y: sy,
      width: x - sx,
      height: y - sy,
      radiusX: Math.abs(x - sx),
      radiusY: Math.abs(y - sy),
      key: ellipseShape.length + 1,
      fill: "red",
      strokeWidth: 0,
      id: new Date().toLocaleTimeString().toString(),
    };
    setEllipseShape([...ellipseShape, annotation]);
  };

  return { createRect, createTriangle, createEllipse };
};

export default useCreateShapes;
