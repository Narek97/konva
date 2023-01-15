import React, { FC, useState } from "react";
import { Arrow, Circle } from "react-konva";
import { useRecoilState } from "recoil";
import { arrowShapeAtom } from "../../store/atom/arrowShape.atom";
import uuid from "react-uuid";
import { spiralArrowShapeAtom } from "../../store/atom/spiralArrowShape.atom";
import { stringify } from "querystring";

interface IArrowShape {
  shapeProps: any;
  onSelect?: (e: any) => void;
}

const ArrowShape: FC<IArrowShape> = ({ onSelect, shapeProps }) => {
  const [isShowCircle, setIsShowCircle] = useState(false);
  const [arrows, setArrows] = useRecoilState(arrowShapeAtom);
  const [spiralArrows, setSpiralArrows] = useRecoilState(spiralArrowShapeAtom);

  const onCircleFromDrag = (e: any) => {
    let newArrows = arrows.map((item: any) => {
      if (item.id === shapeProps.id) {
        return {
          ...item,
          x: e.target.x(),
          y: e.target.y(),
          width: shapeProps.x1 + shapeProps.x - e.target.x(),
          height: shapeProps.y1 + shapeProps.y - e.target.y(),
        };
      }
      return item;
    });
    setArrows(newArrows);
  };

  const onCircleToDrag = (e: any) => {
    let newArrows = arrows.map((item: any) => {
      if (item.id === shapeProps.id) {
        return {
          ...item,
          width: e.target.x() - shapeProps.x,
          height: e.target.y() - shapeProps.y,
        };
      }
      return item;
    });
    setArrows(newArrows);
  };

  const onArrowDrag = (e: any) => {
    setIsShowCircle(false);
    let newArrows = arrows.map((item: any) => {
      if (item.id === shapeProps.id) {
        return {
          ...item,
          x: e.target.x(),
          y: e.target.y(),
        };
      }
      return item;
    });
    setArrows(newArrows);
  };
  const onCircleMiddleDrag = (e: any) => {
    let newArrows = arrows.map((item: any) => {
      if (item.id === shapeProps.id) {
        return {
          ...item,
          midX: -(shapeProps.x1 - shapeProps.x1 + shapeProps.x - e.target.x()),
          midY: shapeProps.y1 - (shapeProps.y1 + shapeProps.y - e.target.y()),
        };
      }
      return item;
    });
    setArrows(newArrows);
  };
  // console.log(spiralArrows, "spiralArrows");
  const onMouseUp = (e: any) => {
    // const newArrows = arrows.filter((item: any) => item.id !== shapeProps.id);
    // const groupId = uuid();
    //
    // if (shapeProps.groupId) {
    //   const copy = JSON.parse(JSON.stringify(spiralArrows));
    //   copy[shapeProps.groupId] = [
    //     // ...copy[shapeProps.groupId],
    //     {
    //       x: shapeProps.x,
    //       y: shapeProps.y,
    //       mpx: e.target.x(),
    //       mpy: e.target.y(),
    //       width: shapeProps.midX,
    //       height: shapeProps.midY,
    //       midX: 0,
    //       midY: 0,
    //       key: spiralArrows.length + 1,
    //       fill: "green",
    //       strokeWidth: 0,
    //       pointer: false,
    //       id: uuid(),
    //       groupId: shapeProps.groupId,
    //     },
    //     {
    //       x: e.target.x(),
    //       y: e.target.y(),
    //       mpx: shapeProps.mpx,
    //       mpy: shapeProps.mpy,
    //       width: shapeProps.mpx - e.target.x(),
    //       height: shapeProps.mpy - e.target.y(),
    //       midX: 0,
    //       midY: 0,
    //       key: spiralArrows.length + 1,
    //       fill: "green",
    //       strokeWidth: 0,
    //       pointer: false,
    //       id: uuid(),
    //       groupId: shapeProps.groupId,
    //     },
    //   ];
    //   setSpiralArrows(copy);
    //
    //   console.log(copy, "spiralArrows123");
    //   // const aa = Object.keys(spiralArrows).map((key: any) => {
    //   //   if (key === shapeProps.groupId) {
    //   //     key = spiralArrows[key].map((arrow: any, index: number) => [
    //   //       {
    //   //         x: shapeProps.x,
    //   //         y: shapeProps.y,
    //   //         mpx: e.target.x(),
    //   //         mpy: e.target.y(),
    //   //         width: shapeProps.midX,
    //   //         height: shapeProps.midY,
    //   //         midX: 0,
    //   //         midY: 0,
    //   //         key: spiralArrows.length + 1,
    //   //         fill: "blue",
    //   //         strokeWidth: 0,
    //   //         pointer: false,
    //   //         id: uuid(),
    //   //         groupId: shapeProps.groupId,
    //   //       },
    //   //       {
    //   //         x: e.target.x(),
    //   //         y: e.target.y(),
    //   //         mpx: shapeProps.mpx,
    //   //         mpy: shapeProps.mpy,
    //   //         width: shapeProps.mpx - e.target.x(),
    //   //         height: shapeProps.mpy - e.target.y(),
    //   //         midX: 0,
    //   //         midY: 0,
    //   //         key: spiralArrows.length + 1,
    //   //         fill: "blue",
    //   //         strokeWidth: 0,
    //   //         pointer: false,
    //   //         id: uuid(),
    //   //         groupId: shapeProps.groupId,
    //   //       },
    //   //     ]);
    //   //   }
    //   //   return key;
    //   // });
    //   //
    //   // console.log(aa, "aa");
    // } else {
    //   const newGroup = {
    //     ...spiralArrows,
    //     [groupId]: [
    //       {
    //         x: shapeProps.x,
    //         y: shapeProps.y,
    //         mpx: e.target.x(),
    //         mpy: e.target.y(),
    //         width: shapeProps.midX,
    //         height: shapeProps.midY,
    //         midX: 0,
    //         midY: 0,
    //         key: spiralArrows.length + 1,
    //         fill: "blue",
    //         strokeWidth: 0,
    //         pointer: false,
    //         id: uuid(),
    //         groupId: groupId,
    //       },
    //       {
    //         x: e.target.x(),
    //         y: e.target.y(),
    //         mpx: shapeProps.mpx,
    //         mpy: shapeProps.mpy,
    //         width: shapeProps.mpx - e.target.x(),
    //         height: shapeProps.mpy - e.target.y(),
    //         midX: 0,
    //         midY: 0,
    //         key: spiralArrows.length + 1,
    //         fill: "blue",
    //         strokeWidth: 0,
    //         pointer: false,
    //         id: uuid(),
    //         groupId: groupId,
    //       },
    //     ],
    //   };
    //   setSpiralArrows(newGroup);
    // }
    // setArrows(newArrows);

    // ----------------------------------
    const newArrows = arrows.filter((item: any) => item.id !== shapeProps.id);
    const groupId = uuid();
    const spiralArray = [
      ...newArrows,
      {
        x: shapeProps.x,
        y: shapeProps.y,
        mpx: e.target.x(),
        mpy: e.target.y(),
        width: shapeProps.midX,
        height: shapeProps.midY,
        midX: 0,
        midY: 0,
        key: spiralArrows.length + 1,
        fill: "blue",
        strokeWidth: 0,
        pointer: false,
        id: uuid(),
        groupId,
      },
      {
        x: e.target.x(),
        y: e.target.y(),
        mpx: shapeProps.mpx,
        mpy: shapeProps.mpy,
        width: shapeProps.mpx - e.target.x(),
        height: shapeProps.mpy - e.target.y(),
        midX: 0,
        midY: 0,
        key: spiralArrows.length + 1,
        fill: "blue",
        strokeWidth: 0,
        pointer: false,
        id: uuid(),
        groupId,
      },
    ];

    setArrows(spiralArray);
  };

  return (
    <>
      <Arrow
        onClick={onSelect}
        onTap={onSelect}
        onMouseDown={() => setIsShowCircle((prev) => !prev)}
        {...shapeProps}
        onDragMove={onArrowDrag}
        pointerAtEnding={shapeProps.pointer}
        pointerLength={20}
        pointerWidth={20}
        // curved
        // tension={0.3}
        strokeWidth={4}
        lineCap="round"
        lineJoin="round"
        fill="black"
        stroke="black"
        name={"arrow"}
        draggable
      />
      {isShowCircle && (
        <Circle
          id="from"
          fill="blue"
          width={10}
          height={10}
          x={shapeProps.x}
          y={shapeProps.y}
          draggable
          onMouseUp={() => setIsShowCircle(false)}
          onDragMove={onCircleFromDrag}
        />
      )}

      {isShowCircle && (
        <Circle
          id="middle"
          fill="red"
          width={10}
          height={10}
          x={shapeProps.x + (shapeProps.x + shapeProps.x1 - shapeProps.x) / 2}
          y={shapeProps.y + (shapeProps.y + shapeProps.y1 - shapeProps.y) / 2}
          draggable
          onMouseUp={onMouseUp}
          onDragMove={onCircleMiddleDrag}
        />
      )}

      {isShowCircle && (
        <Circle
          id="to"
          fill="blue"
          width={10}
          height={10}
          x={shapeProps.x + shapeProps.x1}
          y={shapeProps.y + shapeProps.y1}
          draggable
          onMouseUp={() => setIsShowCircle(false)}
          onDragMove={onCircleToDrag}
        />
      )}
    </>
  );
};

export default ArrowShape;
