import { Enemy, Player } from "entities";
import { Physics } from "phaser";

export class MainGame extends Phaser.Scene {
  ground: Phaser.Physics.Arcade.Sprite | undefined;
  player: Phaser.Physics.Arcade.Sprite | undefined;
  enemy: Enemy | undefined;
  swordHitbox: Phaser.GameObjects.Rectangle;

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

    // this.physics.add.collider(
    //   this.player,
    //   this.swordHitbox,
    //   () => {},
    //   null,
    //   this
    // );

    // Enemy
    this.enemy = new Enemy(this, width, height - groundHeight - 100);
    this.enemy.body?.setSize(this.enemy.width * 0.25, this.enemy.height * 0.35);
    this.physics.add.existing(this.enemy);
    this.physics.add.collider(this.enemy, this.ground);

    this.enemy2 = new Enemy(this, width - 100, height - groundHeight - 100);
    this.enemy2.body?.setSize(
      this.enemy2.width * 0.25,
      this.enemy2.height * 0.35
    );
    this.physics.add.existing(this.enemy2);
    this.physics.add.collider(this.enemy2, this.ground);

    this.enemy3 = new Enemy(this, width - 300, height - groundHeight - 100);
    this.enemy3.body?.setSize(
      this.enemy3.width * 0.25,
      this.enemy3.height * 0.35
    );
    this.physics.add.existing(this.enemy3);
    this.physics.add.collider(this.enemy3, this.ground);

    this.enemy4 = new Enemy(this, width - 500, height - groundHeight - 100);
    this.enemy4.body?.setSize(
      this.enemy4.width * 0.25,
      this.enemy4.height * 0.35
    );
    this.physics.add.existing(this.enemy4);
    this.physics.add.collider(this.enemy4, this.ground);

    this.enemy5 = new Enemy(this, width - 700, height - groundHeight - 100);
    this.enemy5.body?.setSize(
      this.enemy5.width * 0.25,
      this.enemy5.height * 0.35
    );
    this.physics.add.existing(this.enemy5);
    this.physics.add.collider(this.enemy5, this.ground);

    // Misc
    this.physics.add.collider(this.swordHitbox, this.enemy, () => {
      this.enemy?.kill();
    });

    this.physics.add.collider(this.swordHitbox, this.enemy2, () => {
      this.enemy2?.kill();
    });

    this.physics.add.collider(this.swordHitbox, this.enemy3, () => {
      this.enemy3?.kill();
    });

    this.physics.add.collider(this.swordHitbox, this.enemy4, () => {
      this.enemy4?.kill();
    });

    this.physics.add.collider(this.swordHitbox, this.enemy5, () => {
      this.enemy5?.kill();
    });
  }

  update() {
    this.swordHitbox.setX(this.player.x + this.player.displayWidth);
    this.swordHitbox.setY(this.player.y - this.player.displayHeight / 3);

    this.player?.update();
  }
}
