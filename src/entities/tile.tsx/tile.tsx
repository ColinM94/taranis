import { Container, Sprite, Text } from "@pixi/react";

import ground from "assets/sprites/groundTile.png";
import * as Pixi from "pixi.js";

import { Props } from "./types";

export const Tile = ({ x, y, height, width, coordinates }: Props) => {
  return (
    <Container
      x={x}
      y={y}
      height={height}
      width={width}
      anchor={{
        x: 0.5,
        y: 0.5,
      }}
    >
      <Sprite
        texture={Pixi.Texture.from(ground)}
        height={height}
        width={width}
        anchor={{
          x: 0.5,
          y: 0.5,
        }}
      />

      <Text
        text={`${coordinates.x}, ${coordinates.y}, X:${x}, Y:${y}`}
        style={{
          fill: "white",
          fontSize: 12,
        }}
        anchor={{
          x: 0.5,
          y: 0.5,
        }}
      />
    </Container>
  );
};
