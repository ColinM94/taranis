import clouds from "./assets/clouds.png";
import fantasyTiles from "./assets/fantasyTiles.png";
import knight from "./assets/animations/knight.png";
import knightJSON from "./assets/animations/knight.json";
import explosion from "./assets/explosion.png";
import { Player } from "./entities/player";

export class GameScene extends Phaser.Scene {
  keys: Phaser.Input.Keyboard.Key[];

  constructor() {
    super();

    this.keys = [];
  }

  preload() {
    this.load.atlas("knight", knight, knightJSON);
    this.load.image("background", clouds);
    this.load.spritesheet("tiles", fantasyTiles, {
      frameWidth: 64,
      frameHeight: 550,
    });

    this.load.spritesheet("explosion", explosion, {
      frameWidth: 520,
      frameHeight: 520,
      spacing: 1,
    });
  }

  create() {
    let { width, height } = this.sys.game.canvas;
    const groundHeight = 180;

    this.add.tileSprite(0, 30, width, height, "background").setOrigin(0, 0);

    const platforms = this.physics.add.staticGroup();

    for (var i = 0; i < width; i++) {
      platforms.create(i * 64, height, "tiles").refreshBody();
    }

    let player = new Player(this, 0, 0);
    this.physics.add.collider(player, platforms);
    player.play("idle");
  }
}
