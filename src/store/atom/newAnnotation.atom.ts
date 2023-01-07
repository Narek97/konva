import { atom } from "recoil";

export const newAnnotationAtom = atom({
  key: "newAnnotation",
  default: [] as any,
});
