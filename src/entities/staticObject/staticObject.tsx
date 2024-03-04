import { Sprite } from "@pixi/react";

import { Props } from "./types";

export const StaticObject = ({ x, y, height, width, texture }: Props) => {
  return <Sprite x={x} y={y} texture={texture} height={height} width={width} />;
};
