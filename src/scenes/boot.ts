import { Scene } from "phaser";
import background from "../assets/clouds.png";

export class Boot extends Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    this.load.image("background", background);
  }

  create() {
    this.scene.start("Preloader");
  }
}