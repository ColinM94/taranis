import * as React from "react";
import { Container, useApp, useTick } from "@pixi/react";

import { Player, StaticObject } from "entities";
import { useInput } from "store";
import { navigate, reactReducer } from "utils";
import { Torch } from "entities/torch/torch";
import chest from "assets/sprites/chest.png";
import { Tile } from "entities/tile/tile";
import * as PIXI from "pixi.js";

import { GameScreenProps } from "./types";

export const GameScreen = ({}: GameScreenProps) => {
  const input = useInput();

  const app = useApp();

  const [state, updateState] = reactReducer({
    x: 0,
    y: 0,
    flipx: false,
    width: window.innerWidth,
    height: window.innerHeight,
    scale: 1,
  });

  const [camera, updateCamera] = reactReducer({
    x: 0,
    y: 0,
    zoom: 1,
  });

  const [playerGridPosition, setPlayerGridPosition] = React.useState({
    x: 0,
    y: 0,
  });

  const playerGridPositionRef = React.useRef(playerGridPosition);

  React.useEffect(() => {
    const unsubscribe = input.createCallback("pause", () => {
      navigate("mainMenu");
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useTick((delta) => {
    const input = useInput.getState();

    let xChange = 0;
    let yChange = 0;
    let flipped = state.flipx;
    const speed = 10 * (1 / camera.zoom);

    if (input.cameraLeft.isPressed) {
      xChange += speed;
      flipped = true;
    } else if (input.cameraRight.isPressed) {
      xChange -= speed;
      flipped = false;
    }

    if (input.cameraUp.isPressed) {
      yChange += speed / 2;
    } else if (input.cameraDown.isPressed) {
      yChange -= speed / 2;
    }

    if (xChange || yChange) {
      updateCamera({
        x: camera.x + xChange,
        y: camera.y + yChange,
      });
    }

    const scaleFactor = 0.1;
    const maxZoomIn = 5;
    const maxZoomOut = 0.000001;

    if (input.zoomIn.isPressed) {
      let newValue = camera.zoom + scaleFactor * camera.zoom;

      if (newValue >= maxZoomIn) {
        newValue = maxZoomIn;
      }

      camera.zoom = newValue;
    }

    if (input.zoomOut.isPressed) {
      let newValue = camera.zoom - scaleFactor * camera.zoom;

      if (newValue <= maxZoomOut) {
        newValue = maxZoomOut;
      }

      camera.zoom = newValue;
    }

    updateContainerPosition();
  });

  const grid = React.useMemo(() => {
    const grid: {
      x: number;
      y: number;
      width: number;
      height: number;
      center: { x: number; y: number };
    }[][] = [];

    const numRows = 10;
    const numCols = 10;

    const tileHeight = 268;
    const tileWidth = 536;

    for (let row = 0; row < numRows; row++) {
      const rowValue = row / 2;

      grid[row] = [];

      for (let col = 0; col < numCols; col++) {
        const colValue = col / 2;

        const x = tileWidth * rowValue + tileWidth * colValue;
        const y = tileHeight * colValue - tileHeight * rowValue;

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

    console.log("grid");

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

  // React.useEffect(() => {
  //   const unsubscribe = input.createCallback("zoomOut", () => {
  //     console.log("zoomOut");

  //     updateState({
  //       width: state.width * 1.1,
  //       height: state.height * 1.1,
  //     });
  //   });

  //   const unsubscribe2 = input.createCallback("zoomIn", () => {
  //     console.log("zoomIn");

  //     updateState({
  //       width: state.width * -1.1,
  //       height: state.height * -1.1,
  //     });
  //   });

  //   return () => {
  //     unsubscribe();
  //     unsubscribe2();
  //   };
  // }, [state.width, state.height]);

  const updateContainerPosition = () => {
    updateState({
      x: camera.x * camera.zoom + window.innerWidth / 2,
      y: camera.y * camera.zoom + window.innerHeight / 2,
      scale: camera.zoom,
    });
  };

  const movePlayer = (direction: "up" | "down" | "left" | "right") => {
    let updatedX = playerGridPositionRef.current.x;
    let updatedY = playerGridPositionRef.current.y;

    if (direction === "up") {
      updatedX = updatedX + 1;
    } else if (direction === "down") {
      updatedX = updatedX - 1;
    } else if (direction === "left") {
      updatedY = updatedY - 1;
    } else if (direction === "right") {
      updatedY = updatedY + 1;
    }

    if (updatedX !== undefined && grid[updatedX][updatedY] !== undefined) {
      setPlayerGridPosition({
        x: updatedX,
        y: updatedY,
      });

      playerGridPositionRef.current = {
        x: updatedX,
        y: updatedY,
      };
    }
  };

  return (
    <Container
      x={state.x}
      y={state.y}
      // width={state.width}
      // height={state.height}
      scale={{
        y: state.scale,
        x: state.scale,
      }}
    >
      {renderGrid}
      {/* <Torch x={50} y={50} />
      <Torch x={200} y={50} />
      <Torch x={600} y={50} /> */}
      <Container x={2000} y={50}>
        <Torch x={-60} y={-90} />
        <StaticObject x={0} y={0} texture={PIXI.Texture.from(chest)} />
        <Torch x={200} y={50} />
      </Container>

      <Player
        position={{
          x: grid[playerGridPosition.x][playerGridPosition.y].center.x,
          y: grid[playerGridPosition.x][playerGridPosition.y].center.y,
        }}
        onMoveUp={() => movePlayer("up")}
        onMoveDown={() => movePlayer("down")}
        onMoveLeft={() => movePlayer("left")}
        onMoveRight={() => movePlayer("right")}

        // updatePosition={(x, y, width, height) => {
        //   const newX = x * -1 + state.width / 2;
        //   const newY = y * -1 + state.height / 2;

        //   updateState({
        //     x: newX,
        //     y: newY,
        //   });
        // }}
      />
    </Container>
  );
};
