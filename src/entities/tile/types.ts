import { Resource, Texture } from "pixi.js";

export interface Props {
  x: number;
  y: number;
  height: number;
  width: number;
  coordinates: { x: number; y: number };
  center: { x: number; y: number };
  visible: boolean;
  xIndex: number;
  yIndex: number;
  onClick: (info: { xIndex: number; yIndex: number }) => void;
}
