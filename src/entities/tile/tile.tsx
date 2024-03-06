import { Container, Sprite, Text } from "@pixi/react";

import ground from "assets/sprites/ground.png";
import * as Pixi from "pixi.js";

import { Props } from "./types";

export const Tile = (props: Props) => {
  const { x, y, height, width, coordinates, center, visible, xIndex, yIndex } =
    props;

  return (
    <Container
      x={x}
      y={y}
      anchor={{
        x: 0,
        y: 0,
      }}
      visible={visible}
      interactive={true}
      onpointertap={() => {
        props.onClick({ xIndex, yIndex });
      }}
    >
      <Sprite
        texture={Pixi.Texture.from(ground, {
          scaleMode: Pixi.SCALE_MODES.NEAREST,
        })}
        anchor={{
          x: 0.5,
          y: 0.5,
        }}
      />
      {/* <Torch x={0} y={0} /> */}
      {/* <StaticObject
        x={0}
        y={0}
        height={50}
        width={50}
        texture={Pixi.Texture.from(chest)}
      /> */}
      <Text
        // text={`${coordinates.x}, ${coordinates.y}, X:${x}, Y:${y}, center: ${center.x}, ${center.y}`}
        text={`${xIndex}, ${yIndex}`}
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
