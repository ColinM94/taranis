import * as React from "react";
import * as PIXI from "pixi.js";
import { AnimatedSprite } from "@pixi/react";

import image from "assets/animations/knight.png";
import atlas from "assets/animations/knight.json";

export const Player = () => {
  const [frames, setFrames] = React.useState([]);
  const [textures, setTextures] = React.useState<
    PIXI.Texture<PIXI.Resource>[] | PIXI.FrameObject[] | undefined
  >([]);

  //   PIXIReact.useTick((delta) => console.log("do stuff on tick"));

  React.useEffect(() => {
    const frames = Object.values(atlas.textures);

    setFrames(frames);
  }, []);

  if (frames.length === 0) {
    return null;
  }

  return (
    <AnimatedSprite
      animationSpeed={0.5}
      image={image}
      initialFrame={frames[0]}
      textures={frames}
      //   textures={knightJSON.textures}
      isPlaying={true}
    />
  );
};
