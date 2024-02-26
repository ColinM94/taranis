import { Enemy, Player } from "entities";
import { useGameStore, useInput } from "store";
import { navigate } from "utils";

const { createCallback } = useInput.getState();

export class MainGame extends Phaser.Scene {
  ground: Phaser.Physics.Arcade.Sprite | undefined;
  player: Phaser.Physics.Arcade.Sprite | undefined;
  player2: Phaser.Physics.Arcade.Sprite | undefined;
  enemy: Enemy | undefined;

  constructor() {
    super("MainGame");
  }

  preload() {}

  create() {
    let { width, height } = this.sys.game.canvas;
    const groundHeight = 50;

    // Ground
    this.ground = this.physics.add
      .sprite(0, height - groundHeight, "ground")
      .setOrigin(0.5, 0)
      .setCollideWorldBounds(true)
      .setDisplaySize(width, groundHeight);
    this.physics.add.existing(this.ground, true);

    // Player1
    this.player = new Player(this, 0, height - groundHeight - 100, 0);

    this.physics.add.existing(this.player);
    this.physics.add.collider(this.player, this.ground);

    createCallback("uiBack", () => {
      this.scene.stop();
      navigate("mainMenu");
    });

    // Player2
    // this.player2 = new Player(
    //   this,
    //   width - this.player.body?.width,
    //   height - groundHeight - 100,
    //   1,
    //   true
    // );
    // this.physics.add.existing(this.player2);
    // this.physics.add.collider(this.player2, this.ground);

    // this.physics.add.collider(this.player, this.player2);
    // this.physics.add.collider(this.player, this.player3);
    // this.physics.add.collider(this.player2, this.player3);
    // this.physics.add.collider(this.player2, this.player4);

    // // Enemy
    // this.enemy = new Enemy(this, width, height - groundHeight - 100);
    // this.enemy.body?.setSize(this.enemy.width * 0.25, this.enemy.height * 0.35);
    // this.physics.add.existing(this.enemy);
    // this.physics.add.collider(this.enemy, this.ground);

    // // Misc
    // this.physics.add.collider(this.swordHitbox, this.enemy, () => {
    //   this.enemy?.kill();
    // });
  }

  update() {
    const input = useInput.getState();

    this.player?.update();
    this.player2?.update();
  }
}
