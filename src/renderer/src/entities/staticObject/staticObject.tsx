import { Sprite } from "@pixi/react";
import * as PIXI from "pixi.js";

import { Props } from "./types";

export const StaticObject = ({ sprite, ...rest }: Props) => {
  return (
    <Sprite
      texture={PIXI.Texture.from(sprite, {
        scaleMode: PIXI.SCALE_MODES.NEAREST,
      })}
      {...rest}
    />
  );
};
