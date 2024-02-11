import Phaser from "phaser";

import { GameScene } from "./GameScene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 1000,
  height: 800,
  backgroundColor: "#026bc6",
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: true,
    },
  },
  scene: GameScene,
};

export default new Phaser.Game(config);
