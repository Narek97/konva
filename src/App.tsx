import React, { MouseEvent, useRef, useState } from "react";
import { Layer, Stage } from "react-konva";
import Paint from "../src/assests/paint.svg";

const App = () => {
  const layerRef = useRef<any>(null);
  const [currentShape, setCurrentShape] = useState<string | null>(null);
  const [selectIcon, setSelectIcon] = useState<string | null>(null);

  const onAddShape = (shape: string, src?: string) => {
    setCurrentShape(shape);
    setSelectIcon(null);
  };

  const onAddIcon = (event: MouseEvent<HTMLImageElement>) => {
    setSelectIcon((event.target as HTMLImageElement).src);
    setCurrentShape(null);
  };

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
          // onMouseDown={}
          // onMouseUp={}
          // onMouseMove={}
          // onTouchStart={}
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
          <Layer ref={layerRef}></Layer>
        </Stage>
      </div>
    </div>
  );
};

export default App;
