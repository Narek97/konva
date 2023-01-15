import React from "react";
import { useRecoilValue } from "recoil";
import ArrowShape from "./ArrowShape";
import { spiralArrowShapeAtom } from "../../store/atom/spiralArrowShape.atom";

const SpiralArrowWrapper = ({}) => {
  const spiralArrowShape = useRecoilValue(spiralArrowShapeAtom);

  return (
    <>
      {Object.keys(spiralArrowShape).map((key: any) =>
        spiralArrowShape[key].map((arrow: any, index: number) => (
          <ArrowShape
            key={arrow?.id || index}
            shapeProps={{
              // ...arrow,
              id: arrow.id,
              x: arrow.x,
              y: arrow.y,
              x1: arrow.width,
              y1: arrow.height,
              midX: arrow.midX,
              midY: arrow.midY,
              mpx: arrow.mpx,
              mpy: arrow.mpy,
              pointer: arrow.pointer,
              groupId: arrow.groupId,
              points: [
                0,
                0,
                arrow.midX || 0,
                arrow.midY || 0,
                arrow.width,
                arrow.height,
              ],
              // points: getPoints(arrow),
              // closed: true,
              stroke: "black",
            }}
          />
        ))
      )}
    </>
  );
};

export default SpiralArrowWrapper;
