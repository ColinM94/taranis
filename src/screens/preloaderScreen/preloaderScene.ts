import { Scene } from "phaser";

import clouds from "assets/clouds.png";
import knight from "assets/animations/knight.png";
import knightJSON from "assets/animations/knight.json";
import skeletonDeath from "assets/skeleton/Death.png";
import skeletonAttack from "assets/skeleton/Attack.png";

export class PreloaderScene extends Scene {
  constructor() {
    super("Preloader");
  }

  init() {
    alert("preloader starting");
    let { width, height } = this.sys.game.canvas;

    this.add.image(width, height, "background");

    this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

    const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

    this.load.on("progress", (progress: number) => {
      bar.width = 4 + 460 * progress;
    });
  }

  preload() {
    this.load.atlas("knight", knight, knightJSON);

    this.load.image("background", clouds);

    this.load.spritesheet("skeletonAttack", skeletonAttack, {
      frameWidth: 150,
      frameHeight: 150,
      startFrame: 0,
      endFrame: 6,
    });

    this.load.spritesheet("skeletonDeath", skeletonDeath, {
      frameWidth: 150,
      frameHeight: 150,
      startFrame: 0,
      endFrame: 3,
    });
  }

  create() {
    this.scene.start("MainGame");
  }
}
