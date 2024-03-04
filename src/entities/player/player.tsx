import * as React from "react";
import * as Pixi from "pixi.js";
import { Container, Sprite, useTick } from "@pixi/react";

import { useInput } from "store";
import { reactReducer } from "utils";
import player from "assets/sprites/player.png";
import sword from "assets/sprites/sword.png";

interface Props {
  position: {
    x: number;
    y: number;
  };
  onMoveUp: () => void;
  onMoveDown: () => void;
  onMoveLeft: () => void;
  onMoveRight: () => void;
  updatePosition: (x: number, y: number, width: number, height: number) => void;
}

export const Player = (props: Props) => {
  const input = useInput();

  const { position, onMoveUp, onMoveDown, onMoveLeft, onMoveRight } = props;

  const [texture, setTexture] = React.useState<Pixi.Texture>();
  const [textures, setTextures] = React.useState<Pixi.Texture[]>([]);
  const [direction, setDirection] = React.useState<"down" | "up">();

  const [state, updateState] = reactReducer({
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

  React.useEffect(() => {
    const unsubscribe = input.createCallback("moveUp", () => {
      onMoveUp();
      updateState({
        flipx: false,
      });
      setTexture(textures[2]);
    });

    const unsubscribe2 = input.createCallback("moveDown", () => {
      onMoveDown();
      updateState({
        flipx: false,
      });
      setTexture(textures[0]);
    });

    const unsubscribe3 = input.createCallback("moveLeft", () => {
      onMoveLeft();
      updateState({
        flipx: true,
      });
      setTexture(textures[2]);
    });

    const unsubscribe4 = input.createCallback("moveRight", () => {
      onMoveRight();
      updateState({
        flipx: true,
      });
      setTexture(textures[0]);
    });

    return () => {
      unsubscribe();
      unsubscribe2();
      unsubscribe3();
      unsubscribe4();
    };
  }, []);

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
      x={position.x}
      y={position.y}
      scale={{
        x: state.flipx ? -0.5 : 0.5,
        y: 0.5,
      }}
      anchor={{
        x: 0,
        y: 0,
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
