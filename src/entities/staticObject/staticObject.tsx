import { Sprite } from "@pixi/react";

import { Props } from "./types";

export const StaticObject = ({ x, y, texture }: Props) => {
  return <Sprite x={x} y={y} texture={texture} />;
};
