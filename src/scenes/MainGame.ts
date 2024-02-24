import { Enemy, Player } from "entities";
import { useGameStore, useInput } from "store";
import { navigate } from "utils";

const { setIsPaused } = useGameStore.getState();

export class MainGame extends Phaser.Scene {
  ground: Phaser.Physics.Arcade.Sprite | undefined;
  player: Phaser.Physics.Arcade.Sprite | undefined;
  enemy: Enemy | undefined;
  swordHitbox: Phaser.GameObjects.Rectangle | undefined;

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

    // Player
    this.player = new Player(this, 0, height - groundHeight - 100);

    this.physics.add.existing(this.player);
    this.physics.add.collider(this.player, this.ground);

    this.swordHitbox = this.add
      .rectangle(
        this.player.x + this.player.displayWidth,
        this.player.y - this.player.displayHeight / 3,
        this.player.displayWidth / 4,
        this.player.displayHeight / 4,
        0x00ff00
      )
      .setOrigin(0, 1);

    this.physics.world.enable(this.swordHitbox);
    this.swordHitbox.body?.setAllowGravity(false);

    // Enemy
    this.enemy = new Enemy(this, width, height - groundHeight - 100);
    this.enemy.body?.setSize(this.enemy.width * 0.25, this.enemy.height * 0.35);
    this.physics.add.existing(this.enemy);
    this.physics.add.collider(this.enemy, this.ground);

    // Misc
    this.physics.add.collider(this.swordHitbox, this.enemy, () => {
      this.enemy?.kill();
    });
  }

  update() {
    const input = useInput.getState();

    if (input.pause.isPressed) {
      this.scene.pause();
      setIsPaused(true);
    }

    this.swordHitbox.setX(this.player.x + this.player.displayWidth);
    this.swordHitbox.setY(this.player.y - this.player.displayHeight / 3);

    this.player?.update();
  }
}
