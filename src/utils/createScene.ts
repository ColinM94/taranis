import { Scene } from "phaser";

export const createScene = (key: string) => {
  const scene = new Scene(key);

  console.log(scene);
};
