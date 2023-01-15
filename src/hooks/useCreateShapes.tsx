import { useRecoilState } from "recoil";
import { squareShapeAtom } from "../store/atom/squareShape.atom";
import { triangleShapeAtom } from "../store/atom/triangleShape.atom";
import { ellipseShapeAtom } from "../store/atom/ellipseShape.atom";
import { starShapeAtom } from "../store/atom/starShape.atom";
import { roundSquareShapeAtom } from "../store/atom/roundSquareShape.atom";
import { arrowShapeAtom } from "../store/atom/arrowShape.atom";
import { groupShapeAtom } from "../store/atom/groupShape.atom";

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
  const [starShape, setStarShape] = useRecoilState(starShapeAtom);
  const [roundSquare, setRoundSquare] = useRecoilState(roundSquareShapeAtom);
  const [arrowSquare, setArrowSquare] = useRecoilState(arrowShapeAtom);
  const [groupSquare, setGroupSquare] = useRecoilState(groupShapeAtom);

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
      // points: [0, 0, x - sx / 2, y - sy, x - sx, 0],
      closed: true,
      key: triangleShape.length + 1,
      fill: "blue",
      strokeWidth: 0,
      id: Date.now().toString(),
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
      id: Date.now().toString(),
    };
    setEllipseShape([...ellipseShape, annotation]);
  };

  const createStar = ({ sx, sy, x, y }: IUseCreateShapes) => {
    const annotation = {
      x: sx,
      y: sy,
      width: x - sx,
      height: y - sy,
      key: starShape.length + 1,
      fill: "yellow",
      strokeWidth: 0,
      id: Date.now().toString(),
    };
    setStarShape([...starShape, annotation]);
  };

  const createRoundRect = ({ sx, sy, x, y }: IUseCreateShapes) => {
    const annotation = {
      x: sx,
      y: sy,
      width: x - sx,
      height: y - sy,
      numPoints: 5,
      innerRadius: x - sx,
      outerRadius: x - sx / 2,
      rotation: x - sx > 0 ? -180 : 0,
      key: roundSquare.length + 1,
      fill: "purple",
      strokeWidth: 0,
      cornerRadius: 10,
      id: Date.now().toString(),
    };
    setRoundSquare([...roundSquare, annotation]);
  };

  const createArrow = ({ sx, sy, x, y }: IUseCreateShapes) => {
    const annotation = {
      x: sx,
      y: sy,
      mpx: x,
      mpy: y,
      width: x - sx,
      height: y - sy,
      midX: 0,
      midY: 0,
      key: arrowSquare.length + 1,
      fill: "blue",
      strokeWidth: 0,
      pointer: true,
      id: Date.now().toString(),
    };

    setArrowSquare([...arrowSquare, annotation]);
  };

  const createGroup = ({ sx, sy, x, y }: IUseCreateShapes) => {
    const annotation = {
      x: sx,
      y: sy,
      width: x - sx,
      height: y - sy,
      key: groupSquare.length + 1,
      fill: "green",
      strokeWidth: 0,
      id: Date.now().toString(),
      groupItems: [],
    };
    setGroupSquare([...groupSquare, annotation]);
  };

  // const createArrow = ({
  //   arrowStartPos,
  //   arrowEndPos,
  // }: IUseCreateArrowShapes) => {
  //   const annotation = {
  //     arrowStartPos,
  //     arrowEndPos,
  //     id: Date.now().toString(),
  //   };
  //   setArrowSquare([...arrowSquare, annotation]);
  // };

  return {
    createRect,
    createTriangle,
    createEllipse,
    createStar,
    createRoundRect,
    createArrow,
    createGroup,
  };
};

export default useCreateShapes;
