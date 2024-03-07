import * as React from "react";
import * as PIXI from "pixi.js";
import { AnimatedSprite } from "@pixi/react";
import torch from "assets/sprites/torch.png";

import { Props } from "./types";

export const Torch = ({ x, y, height, width }: Props) => {
  const [textures, setTextures] = React.useState<PIXI.Texture[]>([]);

  React.useEffect(() => {
    const widthOfEachSprite = 73;
    const height = 219;

    const texture: PIXI.BaseTexture<PIXI.Resource, PIXI.IAutoDetectOptions> =
      PIXI.BaseTexture.from(torch, {});

    const texture1 = new PIXI.Texture(
      texture,
      new PIXI.Rectangle(0, 0, widthOfEachSprite, height)
    );
    const texture2 = new PIXI.Texture(
      texture,
      new PIXI.Rectangle(widthOfEachSprite, 0, widthOfEachSprite, height)
    );
    const texture3 = new PIXI.Texture(
      texture,
      new PIXI.Rectangle(widthOfEachSprite * 2, 0, widthOfEachSprite, height)
    );

    setTextures([texture1, texture2, texture3]);
  }, []);

  if (textures.length === 0) return null;

  return (
    <AnimatedSprite
      x={x}
      y={y}
      height={height}
      width={width}
      textures={textures}
      isPlaying={true}
      loop={true}
      animationSpeed={0.15}
      anchor={{
        x: 0.5,
        y: 0.5,
      }}
    />
  );
};
