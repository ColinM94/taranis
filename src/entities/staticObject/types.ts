import { Resource, Texture } from "pixi.js";

export interface Props {
  x: number;
  y: number;
  height: number;
  width: number;
  texture: Texture<Resource>;
}
