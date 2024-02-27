import * as React from "react";
import * as PIXI from "pixi.js";
import Pixie, { Container, Stage, Text, useTick, Graphics } from "@pixi/react";

import { GameScreenProps } from "./types";
import styles from "./styles.module.scss";
import { reactReducer } from "utils";
import { useInput, useInput2 } from "store";

export const GameScreen = ({}: GameScreenProps) => {
  const [square, updateSquare] = reactReducer({
    x: 0,
    y: 0,
    width: 150,
    height: 150,
  });

  const [square2, updateSquare2] = reactReducer({
    x: 0,
    y: 0,
    width: 150,
    height: 150,
  });

  useTick(() => {
    const input = useInput.getState();

    let xChange = 0;
    let yChange = 0;

    if (input.moveLeft.isPressed) {
      xChange -= 1;
    }

    if (input.moveRight.isPressed) {
      xChange += 1;
    }

    if (input.moveUp.isPressed) {
      yChange -= 1;
    }

    if (input.moveDown.isPressed) {
      console.log("down");
      yChange += 1;
    }

    if (xChange || yChange) {
      updateSquare({
        x: square.x + xChange,
        y: square.y + yChange,
      });
    }
  });

  useTick(() => {
    const input = useInput2.getState();

    let xChange = 0;
    let yChange = 0;

    if (input.moveLeft.isPressed) {
      xChange -= 1;
    }

    if (input.moveRight.isPressed) {
      xChange += 1;
    }

    if (input.moveUp.isPressed) {
      yChange -= 1;
    }

    if (input.moveDown.isPressed) {
      console.log("down");
      yChange += 1;
    }

    if (xChange || yChange) {
      updateSquare({
        x: square.x + xChange,
        y: square.y + yChange,
      });
    }
  });

  const drawSquare = (
    x: number,
    y: number,
    width: number,
    height: number,
    color: number
  ) => {
    return (
      <Graphics
        x={x}
        y={y}
        draw={(g) => {
          g.beginFill(color);
          g.drawRect(50, 50, height, width);
          g.endFill();
        }}
      />
    );
  };

  return (
    <Container x={100} y={100}>
      {/* <Graphics draw={draw} /> */}

      {drawSquare(square.x, square.y, square.width, square.height, 0xff3300)}
      {drawSquare(
        square2.x,
        square2.y,
        square2.width,
        square2.height,
        0x0000ff
      )}
    </Container>
  );
};
