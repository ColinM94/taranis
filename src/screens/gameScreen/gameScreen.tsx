import * as React from "react";
import { useApp, useTick } from "@pixi/react";

import { Player } from "entities";
import { useInput } from "store";
import { navigate, reactReducer } from "utils";
import { Tile } from "entities/tile/tile";
import { Camera } from "components";

import { GameScreenProps } from "./types";

export const GameScreen = ({}: GameScreenProps) => {
  const input = useInput();

  const app = useApp();

  const [state, updateState] = reactReducer({
    x: 1500,
    y: 64,
    flipx: false,
    width: window.innerWidth,
    height: window.innerHeight,
    scale: 1,
  });

  const numRows = 50;
  const numCols = 50;

  const [playerGridPosition, setPlayerGridPosition] = React.useState({
    x: numRows / 2 - 1,
    y: numCols / 2 - 1,
  });

  React.useEffect(() => {
    const unsubscribe = input.createCallback("pause", () => {
      navigate("mainMenu");
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const grid = React.useMemo(() => {
    const grid: {
      x: number;
      y: number;
      width: number;
      height: number;
      center: { x: number; y: number };
    }[][] = [];

    const tileHeight = 32;
    const tileWidth = 64;

    for (let row = 0; row < numRows; row++) {
      const rowValue = row / 2;

      grid[row] = [];

      for (let col = 0; col < numCols; col++) {
        const colValue = col / 2;

        const x = tileWidth * rowValue + tileWidth * colValue - row * 4;
        const y = tileHeight * colValue - tileHeight * rowValue + row * 3;

        grid[row][col] = {
          x,
          y,
          width: tileWidth,
          height: tileHeight,
          center: {
            x: x,
            y: y - tileHeight / 3,
          },
        };
      }
    }

    return grid;
  }, []);

  const renderGrid = React.useMemo(() => {
    if (!grid) return null;

    const tiles = [];

    for (let row = grid[0].length - 1; row >= 0; row--) {
      for (let col = grid.length - 1; col >= 0; col--) {
        const { x, y, width, height, center } = grid[row][col];

        tiles.push(
          <Tile
            key={`${x}-${y}`}
            x={x}
            y={y}
            height={height}
            width={width}
            coordinates={{ x, y }}
            center={center}
            xIndex={row}
            yIndex={col}
            visible={true}
            onClick={(info) => {
              setPlayerGridPosition({
                x: info.xIndex,
                y: info.yIndex,
              });
            }}
          />
        );
      }
    }

    return tiles;
  }, [grid]);

  const [playerPosition, updatePlayerPosition] = React.useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  return (
    <Camera
      // x={grid[numRows / 2][numCols / 2].center.x}
      // y={grid[numRows / 2][numCols / 2].center.y}
      x={playerPosition.x}
      y={playerPosition.y}
    >
      {renderGrid}

      <Player
        position={playerPosition}
        updatePosition={(position) => updatePlayerPosition(position)}
      />
    </Camera>
  );
};
