import * as React from "react";
import { Container, Text } from "@pixi/react";

import { Props } from "./types";
import { Tile } from "entities/tile/tile";

export const Grid = (props: Props) => {
  const numRows = 10;
  const numCols = 10;

  const grid = React.useMemo(() => {
    const grid: {
      x: number;
      y: number;
      width: number;
      height: number;
      center: { x: number; y: number };
    }[][] = [];

    const tileHeight = 64;
    const tileWidth = 128;

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
            onClick={function (info: { xIndex: number; yIndex: number }): void {
              throw new Error("Function not implemented.");
            }} // onClick={(info) => {
            //   setPlayerGridPosition({
            //     x: info.xIndex,
            //     y: info.yIndex,
            //   });
            // }}
          />
        );
      }
    }

    return tiles;
  }, [grid]);

  return { renderGrid };
};
