import * as React from "react";
import * as Pixi from "pixi.js";
import { Container, Sprite, useTick } from "@pixi/react";

import { useInput } from "store";
import { reactReducer } from "utils";
import player from "assets/sprites/player.png";
import sword from "assets/sprites/sword.png";

interface Props {
  position: { x: number; y: number };
  updatePosition: (position: { x: number; y: number }) => void;
}

interface PlayerState {
  flipx: boolean;
  height: number;
  width: number;
  texture: Pixi.Texture | undefined;
}

export const Player = (props: Props) => {
  const input = useInput();

  const { position, updatePosition } = props;

  const [textures, setTextures] = React.useState<Pixi.Texture[]>([]);
  const [direction, setDirection] = React.useState<"down" | "up">();

  const [state, updateState] = reactReducer<PlayerState>({
    flipx: false,
    height: 0,
    width: 0,
    texture: undefined,
  });

  const [weapon, setWeapon] = reactReducer({
    rotation: 1,
  });

  React.useEffect(() => {
    const widthOfEachSprite = 144;
    const height = 448;

    updateState({
      width: widthOfEachSprite,
      height,
    });

    const texture: Pixi.BaseTexture<Pixi.Resource, Pixi.IAutoDetectOptions> =
      Pixi.BaseTexture.from(player);

    const texture1 = new Pixi.Texture(
      texture,
      new Pixi.Rectangle(0, 0, widthOfEachSprite, height)
    );
    const texture2 = new Pixi.Texture(
      texture,
      new Pixi.Rectangle(widthOfEachSprite, 0, widthOfEachSprite, height)
    );
    const texture3 = new Pixi.Texture(
      texture,
      new Pixi.Rectangle(widthOfEachSprite * 2, 0, widthOfEachSprite, height)
    );
    const texture4 = new Pixi.Texture(
      texture,
      new Pixi.Rectangle(widthOfEachSprite * 3, 0, widthOfEachSprite, height)
    );

    setTextures([texture1, texture2, texture3, texture4]);
    updateState({ texture: texture1 });
  }, []);

  useTick(() => {
    const input = useInput.getState();

    let xChange = 0;
    let yChange = 0;
    let flipped = state.flipx;
    const speed = 10;
    let texture = state.texture;

    if (input.moveLeft.isPressed) {
      xChange -= speed;
      flipped = true;
      texture = textures[2];
    } else if (input.moveRight.isPressed) {
      xChange += speed;
      flipped = false;
      texture = textures[2];
    }

    if (input.moveUp.isPressed) {
      yChange -= speed / 2;
      texture = textures[3];
      flipped = true;
    } else if (input.moveDown.isPressed) {
      yChange += speed / 2;
      texture = textures[1];
      flipped = false;
    }

    if (xChange || yChange) {
      updateState({
        flipx: flipped,
        texture: texture,
      });

      updatePosition({
        x: position.x + xChange,
        y: position.y + yChange,
      });
    }
  });

  React.useEffect(() => {
    if (input.attack.isPressed) {
      setWeapon({
        rotation: direction === "up" ? weapon.rotation - 5 : 10,
      });
    } else {
      setWeapon({
        rotation: direction === "up" ? 1 : -1,
      });
    }
  }, [input.attack.isPressed]);

  if (!state.texture) return null;

  return (
    <Container
      x={position.x}
      y={position.y}
      scale={{
        x: state.flipx ? -0.1 : 0.1,
        y: 0.1,
      }}
      anchor={{
        x: 0,
        y: 0,
      }}
    >
      <Sprite
        x={0}
        y={0}
        texture={state.texture}
        anchor={{
          x: 0.5,
          y: 0.5,
        }}
        zIndex={1}
      />

      <Sprite
        texture={Pixi.Texture.from(sword)}
        position={{ x: 20, y: 80 }}
        rotation={weapon.rotation}
        scale={0.7}
        anchor={{
          x: 0.5,
          y: 1,
        }}
      />
    </Container>
  );
};
