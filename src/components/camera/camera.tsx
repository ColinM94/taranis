import { Container, useTick } from "@pixi/react";
import { reactReducer } from "utils";
import { useInput } from "store";

import { Props } from "./types";
import React from "react";

export const Camera = (props: Props) => {
  const { x, y, defaultX, defaultY, children } = props;

  const camera = React.useRef({
    x: x ? -x : defaultX ? -defaultX : 0,
    y: y ? -y : defaultY ? -defaultY : 0,
    zoom: 1,
  });

  const [world, updateWorld] = reactReducer({
    x: 0,
    y: 0,
    flipx: false,
    width: window.innerWidth,
    height: window.innerHeight,
    scale: 1,
  });

  React.useEffect(() => {
    if (x) camera.current.x = -x;
    if (y) camera.current.y = -y;
  }, [x, y]);

  useTick(() => {
    const input = useInput.getState();

    let xChange = 0;
    let yChange = 0;
    const speed = 10 * (1 / camera.current.zoom);

    if (input.cameraLeft.isPressed) {
      xChange += speed;
    } else if (input.cameraRight.isPressed) {
      xChange -= speed;
    }

    if (input.cameraUp.isPressed) {
      yChange += speed / 2;
    } else if (input.cameraDown.isPressed) {
      yChange -= speed / 2;
    }

    if (xChange || yChange) {
      camera.current.x = camera.current.x + xChange;
      camera.current.y = camera.current.y + yChange;
    }

    const scaleFactor = 0.1;
    const maxZoomIn = 5;
    const maxZoomOut = 0.000001;

    if (input.zoomIn.isPressed) {
      let newValue = camera.current.zoom + scaleFactor * camera.current.zoom;

      if (newValue >= maxZoomIn) {
        newValue = maxZoomIn;
      }

      camera.current.zoom = newValue;
    }

    if (input.zoomOut.isPressed) {
      let newValue = camera.current.zoom - scaleFactor * camera.current.zoom;

      if (newValue <= maxZoomOut) {
        newValue = maxZoomOut;
      }

      camera.current.zoom = newValue;
    }

    updateWorld({
      x: camera.current.x * camera.current.zoom + window.innerWidth / 2,
      y: camera.current.y * camera.current.zoom + window.innerHeight / 2,
      scale: camera.current.zoom,
    });
  });

  return (
    <Container
      x={world.x}
      y={world.y}
      scale={{
        y: world.scale,
        x: world.scale,
      }}
      anchor={[0.5, 0.5]}
    >
      {children}
    </Container>
  );
};
