import React, { FC } from "react";
import { newAnnotationAtom } from "../../store/atom/newAnnotation.atom";
import { useRecoilValue } from "recoil";
import GroupShape from "./GroupShape";
import { groupShapeAtom } from "../../store/atom/groupShape.atom";

interface IGroupWrapper {
  currentShape: string | null;
  onShapeSelect: (e: any) => void;
}

const GroupWrapper: FC<IGroupWrapper> = ({ currentShape, onShapeSelect }) => {
  const annotation = useRecoilValue(newAnnotationAtom);
  const groupShape = useRecoilValue(groupShapeAtom);
  const groups =
    currentShape === "group" ? [...annotation, ...groupShape] : groupShape;

  return (
    <>
      {groups.map((group: any, index: number) => (
        <GroupShape
          key={group?.id || index}
          shapeProps={{ ...group, stroke: "black", fill: "orange" }}
          onSelect={onShapeSelect}
        />
      ))}
    </>
  );
};

export default GroupWrapper;
