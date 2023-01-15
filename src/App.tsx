import React, { MouseEvent, useCallback, useRef, useState } from "react";
import { Layer, Line, Rect, Stage, Transformer } from "react-konva";
import { newAnnotationAtom } from "./store/atom/newAnnotation.atom";
import Konva from "konva";
import Paint from "../src/assests/paint.svg";
import { useRecoilState, useRecoilValue } from "recoil";
import SquareWrapper from "./components/square/SquareWrapper";
import useCreateShapes from "./hooks/useCreateShapes";
import TriangleWrapper from "./components/triangle/TriangleWrapper";
import EllipseWrapper from "./components/ellipse/EllipseWrapper";
import StarWrapper from "./components/star/StarWrapper";
import RoundSquareWrapper from "./components/roundSquare/roundSquareWrapper";
import ArrowWrapper from "./components/arrow/ArrowWrapper";
import { Html } from "react-konva-utils";
import Xarrow from "react-xarrows";
import { connectionArrowAtom } from "./store/atom/connectionArrow.atom";
import GroupWrapper from "./components/group/GroupWrapper";
import SpiralArrowWrapper from "./components/arrow/SpiralArrowsWrapper";

declare global {
  interface Window {
    Konva: typeof Konva;
  }
}

const App = () => {
  const layerRef = useRef<any>(null);
  const [currentShape, setCurrentShape] = useState<string | null>(null);
  const [selectIcon, setSelectIcon] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [isDrawingShape, setIsDrawingShape] = useState<boolean>(false);
  const [isGroupTransformer, setIsGroupTransformer] = useState(false);
  const [lines, setLines] = useState<any>([]);
  const [newAnnotation, setNewAnnotation] = useRecoilState(newAnnotationAtom);
  const arrows = useRecoilValue(connectionArrowAtom);

  const {
    createRect,
    createTriangle,
    createEllipse,
    createStar,
    createRoundRect,
    createArrow,
    createGroup,
  } = useCreateShapes();

  const trRef = useRef<any>(null);
  const selectionRectRef = useRef<any>(null);
  const selection = useRef<{
    visible: boolean;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  }>({
    visible: false,
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
  });

  const onAddShape = (shape: string) => {
    trRef.current.nodes([]);
    setNewAnnotation([]);
    setCurrentShape((prev) => (prev === shape ? null : shape));
    setSelectIcon(null);
  };

  const onAddIcon = (event: MouseEvent<HTMLImageElement>, isDraw?: boolean) => {
    const src = (event.target as HTMLImageElement).src;
    setSelectIcon((prev) => (prev === src ? null : src));
    isDraw && setIsDrawingShape((prev) => !prev);
    setCurrentShape(null);
  };

  const updateSelectionRect = () => {
    const node = selectionRectRef.current;
    node.setAttrs({
      visible: selection.current.visible,
      x: Math.min(selection.current.x1, selection.current.x2),
      y: Math.min(selection.current.y1, selection.current.y2),
      width: Math.abs(selection.current.x1 - selection.current.x2),
      height: Math.abs(selection.current.y1 - selection.current.y2),
      fill: "rgba(0, 161, 255, 0.3)",
    });
    node.getLayer().batchDraw();
  };

  const groupTransformer = (selBox: any) => {
    const elements: any = [];
    [
      ...layerRef.current.find(".square"),
      ...layerRef.current.find(".triangle"),
      ...layerRef.current.find(".ellipse"),
      ...layerRef.current.find(".star"),
      ...layerRef.current.find(".roundSquare"),
      ...layerRef.current.find(".draw"),
      ...layerRef.current.find(".group"),
      // ...layerRef.current.find(".icon"),
      // ...layerRef.current.find(".arrow"),
    ].forEach((elementNode: any) => {
      const elBox = elementNode.getClientRect();
      if (Konva.Util.haveIntersection(selBox, elBox)) {
        elements.push(elementNode);
      }
    });
    trRef.current.nodes(elements);
    selection.current.visible = false;
    updateSelectionRect();
  };

  const onMouseDown = (e: Konva.KonvaEventObject<any>) => {
    const pos = e.target.getStage()?.getPointerPosition();

    if (e.target.attrs.id === "stage") {
      // setInstruments(false);
    }
    if (
      currentShape &&
      !newAnnotation.length &&
      e.target.attrs.id === "stage"
    ) {
      setNewAnnotation([
        { x: pos?.x, y: pos?.y, width: 0, height: 0, key: "0" },
      ]);
      return;
    }
    if (isDrawingShape) {
      setIsDrawing(true);
      setLines([...lines, { points: [pos?.x, pos?.y] }]);
      return;
    }

    if (e.target.attrs.id === "stage" && !isDrawingShape) {
      selection.current.visible = true;
      selection.current.x1 = pos?.x!;
      selection.current.y1 = pos?.y!;
      selection.current.x2 = pos?.x!;
      selection.current.y2 = pos?.y!;
      updateSelectionRect();
    }
  };

  const onMouseMove = (e: Konva.KonvaEventObject<any>) => {
    const pos = e.target.getStage()?.getPointerPosition();
    if (currentShape && newAnnotation.length) {
      const sx = newAnnotation[0].x;
      const sy = newAnnotation[0].y;

      setNewAnnotation([
        {
          x: sx,
          y: sy,
          width: pos?.x! - sx,
          height: pos?.y! - sy,
          key: "0",
        },
      ]);
      return;
    }
    if (isDrawingShape && isDrawing) {
      let lastLine = lines[lines.length - 1];
      // add point
      lastLine.points = lastLine.points.concat([pos?.x, pos?.y]);
      // replace last
      lines.splice(lines.length - 1, 1, lastLine);
      setLines(lines.concat());
      return;
    }

    if (!selection.current.visible) {
      return;
    }
    selection.current.x2 = pos?.x!;
    selection.current.y2 = pos?.y!;
    updateSelectionRect();
  };

  const onMouseUp = (e: Konva.KonvaEventObject<any>) => {
    if (newAnnotation.length) {
      const sx = newAnnotation[0].x;
      const sy = newAnnotation[0].y;
      const pos = e.target.getStage()?.getPointerPosition();

      if (currentShape === "square") {
        createRect({ sx, sy, x: pos?.x!, y: pos?.y! });
      }
      if (currentShape === "triangle") {
        createTriangle({ sx, sy, x: pos?.x!, y: pos?.y! });
      }
      if (currentShape === "ellipse") {
        createEllipse({ sx, sy, x: pos?.x!, y: pos?.y! });
      }
      if (currentShape === "star") {
        createStar({ sx, sy, x: pos?.x!, y: pos?.y! });
      }
      if (currentShape === "roundSquare") {
        createRoundRect({ sx, sy, x: pos?.x!, y: pos?.y! });
      }
      if (currentShape === "arrow") {
        createArrow({ sx, sy, x: pos?.x!, y: pos?.y! });
      }
      if (currentShape === "group") {
        createGroup({ sx, sy, x: pos?.x!, y: pos?.y! });
      }

      setNewAnnotation([]);
      setIsDrawing(false);
      setIsDrawingShape(false);
      return;
    }

    if (isDrawingShape) {
      setIsDrawing(false);
    }

    if (!selection.current.visible) {
      return;
    }
    const selBox = selectionRectRef.current.getClientRect();
    groupTransformer(selBox);
  };

  const onTouchStart = (e: Konva.KonvaEventObject<any>) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      trRef.current.nodes([]);
    }
  };

  const onShapeSelect = useCallback(
    (e: any) => {
      if (e?.current) {
        if (e.current.name() === "group") {
          setIsGroupTransformer(true);
          const selBox = e.current.getClientRect();
          groupTransformer(selBox);
        } else {
          setIsGroupTransformer(false);
          if (e.current) {
            trRef.current.nodes([e.current]);
            trRef.current.getLayer().batchDraw();
          }
        }
      } else {
        trRef.current.nodes([]);
      }

      setCurrentShape(null);
      setIsDrawing(false);
      setIsDrawingShape(false);
    },
    [groupTransformer]
  );

  return (
    <div className={"app"}>
      <div className={"header"}>
        <button onClick={() => onAddShape("square")}>Square</button>
        <button onClick={() => onAddShape("triangle")}>Triangle</button>
        <button onClick={() => onAddShape("ellipse")}>Ellipse</button>
        <button onClick={() => onAddShape("star")}>Star</button>
        <button onClick={() => onAddShape("roundSquare")}>Round Square</button>
        <button onClick={() => onAddShape("arrow")}>Arrow</button>
        <button onClick={() => onAddShape("group")}>Group</button>

        <img
          alt={"cooling"}
          src={Paint}
          width="25"
          onClick={(e) => onAddIcon(e, true)}
        />
      </div>
      <div>
        <Stage
          width={window.innerWidth - 40}
          height={window.innerHeight - 140}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onTouchStart={onTouchStart}
          // onClick={}

          style={{
            cursor: `${
              selectIcon
                ? `url(${selectIcon})  0 20, auto`
                : currentShape
                ? "crosshair"
                : "auto"
            }`,
          }}
          className={`board`}
          id={"stage"}
        >
          <Layer ref={layerRef}>
            {lines.map((line: any, i: any) => (
              <Line
                draggable
                key={i}
                points={line.points}
                stroke="black"
                strokeWidth={2}
                tension={0.2}
                lineCap="round"
                lineJoin="round"
                name="draw"
              />
            ))}

            <GroupWrapper
              currentShape={currentShape}
              onShapeSelect={onShapeSelect}
            />

            <SquareWrapper
              currentShape={currentShape}
              onShapeSelect={onShapeSelect}
            />
            <TriangleWrapper
              currentShape={currentShape}
              onShapeSelect={onShapeSelect}
            />
            <EllipseWrapper
              currentShape={currentShape}
              onShapeSelect={onShapeSelect}
            />
            <StarWrapper
              currentShape={currentShape}
              onShapeSelect={onShapeSelect}
            />
            <RoundSquareWrapper
              currentShape={currentShape}
              onShapeSelect={onShapeSelect}
            />
            <ArrowWrapper
              currentShape={currentShape}
              onShapeSelect={onShapeSelect}
            />

            <SpiralArrowWrapper />

            <Html>
              {arrows.map((ar: any) => (
                <Xarrow
                  start={ar.start}
                  end={ar.end}
                  key={ar.start + "-." + ar.start}
                />
              ))}
            </Html>

            <Transformer
              resizeEnabled={!isGroupTransformer}
              rotateEnabled={!isGroupTransformer}
              borderStrokeWidth={isGroupTransformer ? 0 : 1}
              ref={trRef}
              boundBoxFunc={(oldBox, newBox) => {
                if (newBox.width < 30 || newBox.height < 30) {
                  return oldBox;
                }
                return newBox;
              }}
            />

            <Rect fill="rgba(0,0,255,0.5)" ref={selectionRectRef} />
          </Layer>
        </Stage>
      </div>
    </div>
  );
};
export default App;
