import * as React from "react";
import { Container, useTick } from "@pixi/react";

import { Player, StaticObject } from "entities";
import { useInput } from "store";
import { navigate, reactReducer } from "utils";
import { Torch } from "entities/torch/torch";
import chest from "assets/sprites/chest.png";
import * as PIXI from "pixi.js";

import { GameScreenProps } from "./types";

export const GameScreen = ({}: GameScreenProps) => {
  const input = useInput();

  const [state, updateState] = reactReducer({
    x: 0,
    y: 0,
    flipx: false,
  });

  React.useEffect(() => {
    const unsubscribe = input.createCallback("pause", () => {
      navigate("mainMenu");
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useTick(() => {
    const input = useInput.getState();

    let xChange = 0;
    let yChange = 0;
    let flipped = state.flipx;
    const speed = 5;

    if (input.moveLeft.isPressed) {
      xChange += speed;
      flipped = true;
    } else if (input.moveRight.isPressed) {
      xChange -= speed;
      flipped = false;
    }

    if (input.moveUp.isPressed) {
      yChange += speed;
    } else if (input.moveDown.isPressed) {
      yChange -= speed;
    }

    if (xChange || yChange) {
      updateState({
        x: state.x + xChange,
        y: state.y + yChange,
        flipx: flipped,
      });
    }
  });

  return (
    <Container x={state.x} y={state.y}>
      {/* <Torch x={50} y={50} />
      <Torch x={200} y={50} />
      <Torch x={600} y={50} /> */}
      <Container x={0} y={0}>
        <Torch x={-60} y={-90} />
        <StaticObject x={0} y={0} texture={PIXI.Texture.from(chest)} />
        <Torch x={200} y={50} />
      </Container>
      <Player x={500} y={500} />
    </Container>
  );
};
