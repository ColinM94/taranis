import * as React from "react";
import { Container, Sprite, useTick } from "@pixi/react";

import * as Pixi from "pixi.js";
import { reactReducer } from "utils";
import player from "assets/sprites/player.png";
import sword from "assets/sprites/sword.png";
import { useInput } from "store";

interface Props {
  x: number;
  y: number;
}

export const Player = (props: Props) => {
  const input = useInput();

  const [state, updateState] = reactReducer({
    x: props.x,
    y: props.y,
    flipx: false,
  });

  const [weapon, setWeapon] = reactReducer({
    rotation: 1,
  });

  useTick(() => {
    const input = useInput.getState();

    let xChange = 0;
    let yChange = 0;
    let flipped = state.flipx;
    const speed = 5;

    if (input.moveLeft.isPressed) {
      xChange -= speed;
      flipped = true;
    } else if (input.moveRight.isPressed) {
      xChange += speed;
      flipped = false;
    }

    if (input.moveUp.isPressed) {
      yChange -= speed;
    } else if (input.moveDown.isPressed) {
      yChange += speed;
    }

    if (xChange || yChange) {
      updateState({
        x: state.x + xChange,
        y: state.y + yChange,
        flipx: flipped,
      });
    }
  });

  React.useEffect(() => {
    if (input.attack.isPressed) {
      setWeapon({
        rotation: weapon.rotation - 5,
      });
    } else {
      setWeapon({
        rotation: 1,
      });
    }
  }, [input.attack.isPressed]);

  return (
    <Container
      x={state.x}
      y={state.y}
      scale={{
        x: state.flipx ? -0.5 : 0.5,
        y: 0.5,
      }}
    >
      <Sprite
        texture={Pixi.Texture.from(player)}
        x={0}
        y={0}
        anchor={{
          x: 0.5,
          y: 0.5,
        }}
      />

      <Sprite
        texture={Pixi.Texture.from(sword)}
        position={{ x: 80, y: 100 }}
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
