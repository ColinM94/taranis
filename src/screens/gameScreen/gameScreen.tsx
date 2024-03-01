import * as React from "react";
import { Container, useTick } from "@pixi/react";

import { Player, StaticObject } from "entities";
import { useInput } from "store";
import { navigate, reactReducer } from "utils";
import { Torch } from "entities/torch/torch";
import chest from "assets/sprites/chest.png";
import * as PIXI from "pixi.js";

import { GameScreenProps } from "./types";
import { Tile } from "entities/tile.tsx/tile";

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
        y: state.y + yChange / 2,
        flipx: flipped,
      });
    }
  });

  const grid = React.useMemo(() => {
    const grid: {
      x: number;
      y: number;
      width: number;
      height: number;
      center: { x: number; y: number };
    }[][] = [];

    const numRows = 50;
    const numCols = 50;

    const tileHeight = 268;
    const tileWidth = 536;

    for (let row = 0; row < numRows; row++) {
      const rowValue = row / 2;

      grid[row] = [];

      for (let col = 0; col < numCols; col++) {
        const colValue = col / 2;

        grid[row][col] = {
          x: tileWidth * rowValue + tileWidth * colValue,
          y: tileHeight * colValue - tileHeight * rowValue,
          width: tileWidth,
          height: tileHeight,
          center: {
            x: tileWidth * rowValue + tileWidth * colValue + tileWidth / 2,
            y: tileHeight * colValue - tileHeight * rowValue + tileHeight / 2,
          },
        };
      }
    }

    return grid;
  }, []);

  const renderGrid = React.useMemo(() => {
    if (!grid) return null;

    const tiles = [];

    for (let row = 0; row < grid[0].length; row++) {
      for (let col = 0; col < grid.length; col++) {
        const { x, y, width, height, center } = grid[row][col];

        tiles.push(
          <Tile
            key={`${x}-${y}`}
            x={x}
            y={y}
            height={height}
            width={width}
            coordinates={{ x, y }}
          />
        );
      }
    }

    return tiles;
  }, [grid]);

  return (
    <Container x={state.x} y={state.y}>
      {renderGrid}
      {/* <Torch x={50} y={50} />
      <Torch x={200} y={50} />
      <Torch x={600} y={50} /> */}
      <Container x={2000} y={50}>
        <Torch x={-60} y={-90} />
        <StaticObject x={0} y={0} texture={PIXI.Texture.from(chest)} />
        <Torch x={200} y={50} />
      </Container>
      <Player x={500} y={500} />
    </Container>
  );
};
