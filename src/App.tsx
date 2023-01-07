import React, { MouseEvent, useCallback, useRef, useState } from "react";
import { Layer, Rect, Stage, Transformer } from "react-konva";
import Konva from "konva";
import Paint from "../src/assests/paint.svg";
import { useRecoilState } from "recoil";
import { newAnnotationAtom } from "./store/atom/newAnnotation.atom";
import SquareWrapper from "./components/square/SquareWrapper";
import useCreateShapes from "./hooks/useCreateShapes";
import TriangleWrapper from "./components/triangle/TriangleWrapper";

declare global {
  interface Window {
    Konva: typeof Konva;
  }
}

const App = () => {
  const layerRef = useRef<any>(null);
  const [currentShape, setCurrentShape] = useState<string | null>(null);
  const [selectIcon, setSelectIcon] = useState<string | null>(null);
  const [newAnnotation, setNewAnnotation] = useRecoilState(newAnnotationAtom);
  const { createRect, createTriangle } = useCreateShapes();

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

  const onAddIcon = (event: MouseEvent<HTMLImageElement>) => {
    const src = (event.target as HTMLImageElement).src;
    setSelectIcon((prev) => (prev === src ? null : src));
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

  const onMouseDown = (e: Konva.KonvaEventObject<any>) => {
    const pos = e.target.getStage()?.getPointerPosition();

    if (currentShape && !newAnnotation.length) {
      setNewAnnotation([
        { x: pos?.x, y: pos?.y, width: 0, height: 0, key: "0" },
      ]);
      return;
    }
    if (e.target.attrs.id === "stage") {
      selection.current.visible = true;
      selection.current.x1 = pos?.x!;
      selection.current.y1 = pos?.y!;
      selection.current.x2 = pos?.x!;
      selection.current.y2 = pos?.y!;
      updateSelectionRect();
    }
  };

  const onMouseMove = (e: Konva.KonvaEventObject<any>) => {
    if (currentShape && newAnnotation.length) {
      const sx = newAnnotation[0].x;
      const sy = newAnnotation[0].y;
      const pos = e.target.getStage()?.getPointerPosition();

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

    if (!selection.current.visible) {
      return;
    }

    const pos = e.target.getStage()?.getPointerPosition();
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

      // setCurrentShape(null);
      // setSelectIcon(null);
      setNewAnnotation([]);
      return;
    }

    if (!selection.current.visible) {
      return;
    }
    const selBox = selectionRectRef.current.getClientRect();
    const elements: any = [];
    [
      ...layerRef.current.find(".square"),
      ...layerRef.current.find(".triangle"),
      ...layerRef.current.find(".ellipse"),
      ...layerRef.current.find(".star"),
      ...layerRef.current.find(".roundSquare"),
      // ...layerRef.current.find(".paint"),
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

  const onTouchStart = (e: Konva.KonvaEventObject<any>) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      trRef.current.nodes([]);
    }
  };

  const onShapeSelect = useCallback((e: any) => {
    if (e.current) {
      trRef.current.nodes([e.current]);
      trRef.current.getLayer().batchDraw();
    }

    setCurrentShape(null);
  }, []);

  return (
    <div className={"app"}>
      <div className={"header"}>
        <button onClick={() => onAddShape("square")}>Square</button>
        <button onClick={() => onAddShape("triangle")}>Triangle</button>
        <button onClick={() => onAddShape("ellipse")}>Ellipse</button>
        <button onClick={() => onAddShape("star")}>Star</button>
        <button onClick={() => onAddShape("roundSquare")}>Round Square</button>
        <img alt={"cooling"} src={Paint} width="25" onClick={onAddIcon} />
        <button onClick={() => onAddShape("arrow")}>Arrow</button>
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
                ? `url(${selectIcon}), auto`
                : currentShape
                ? "crosshair"
                : "auto"
            }`,
          }}
          className={`board`}
          id={"stage"}
        >
          <Layer ref={layerRef}>
            <SquareWrapper
              currentShape={currentShape}
              onShapeSelect={onShapeSelect}
            />
            <TriangleWrapper
              currentShape={currentShape}
              onShapeSelect={onShapeSelect}
            />

            <Transformer
              resizeEnabled={true}
              rotateEnabled={true}
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
