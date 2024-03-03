import * as React from "react";
import * as Pixi from "pixi.js";
import { Container, Sprite, useTick } from "@pixi/react";

import { useInput } from "store";
import { reactReducer } from "utils";
import player from "assets/sprites/player.png";
import sword from "assets/sprites/sword.png";

interface Props {
  x: number;
  y: number;
  updatePosition: (x: number, y: number, width: number, height: number) => void;
}

export const Player = (props: Props) => {
  const input = useInput();

  const [texture, setTexture] = React.useState<Pixi.Texture>();
  const [textures, setTextures] = React.useState<Pixi.Texture[]>([]);
  const [direction, setDirection] = React.useState<"down" | "up">();

  const [state, updateState] = reactReducer({
    x: props.x,
    y: props.y,
    flipx: false,
    height: 0,
    width: 0,
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
    setTexture(texture1);
  }, []);

  useTick(() => {
    if (textures.length === 0) return;

    const input = useInput.getState();

    let xChange = 0;
    let yChange = 0;
    let flipped = state.flipx;
    const speed = 5;

    if (input.moveDown.isPressed && input.moveLeft.isPressed) {
      setTexture(textures[0]);
      flipped = false;
      setDirection("down");
    } else if (input.moveDown.isPressed && input.moveRight.isPressed) {
      setTexture(textures[0]);
      flipped = true;
      setDirection("down");
    } else if (input.moveUp.isPressed && input.moveRight.isPressed) {
      setTexture(textures[2]);
      flipped = false;
      setDirection("up");
    } else if (input.moveUp.isPressed && input.moveLeft.isPressed) {
      setTexture(textures[2]);
      flipped = true;
      setDirection("up");
    }

    // if (input.moveLeft.isPressed) {
    //   xChange -= speed;
    // } else if (input.moveRight.isPressed) {
    //   xChange += speed;
    // }

    // if (input.moveUp.isPressed) {
    //   yChange -= speed;
    // } else if (input.moveDown.isPressed) {
    //   yChange += speed;
    // }

    // if (xChange || yChange) {
    //   updateState({
    //     x: state.x + xChange,
    //     y: state.y + yChange / 2,
    //     flipx: flipped,
    //   });
    // }
  });

  // React.useEffect(() => {
  //   props.updatePosition(state.x, state.y, state.width, state.height);
  // }, [state.x, state.y]);

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

  if (!texture) return null;

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
        x={0}
        y={0}
        texture={texture}
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
