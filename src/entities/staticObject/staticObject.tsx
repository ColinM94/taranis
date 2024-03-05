import { Sprite } from "@pixi/react";

import { Props } from "./types";

export const StaticObject = ({ ...rest }: Props) => {
  return <Sprite {...rest} />;
};
