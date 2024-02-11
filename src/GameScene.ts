import knight from "./assets/animations/knight.png";
import knightJSON from "./assets/animations/knight.json";
import clouds from "./assets/clouds.png";
import fantasyTiles from "./assets/fantasyTiles.png";
import guardian from "./assets/Guardian Idle.png";
import explosion from "./assets/explosion.png";

export class GameScene extends Phaser.Scene {
  player: Phaser.Physics.Arcade.Sprite;

  constructor() {
    super();
  }

  preload() {
    this.load.atlas("knight", knight, knightJSON);
    this.load.image("background", clouds);
    this.load.image("guardian", guardian);
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

    this.player = this.physics.add
      .sprite(300, groundHeight, "knight")
      .setScale(3);

    this.enemy = this.physics.add
      .sprite(400, groundHeight, "guardian")
      .setScale(3);

    this.anims.create({
      key: "explosionAnimation",
      frames: this.anims.generateFrameNumbers("explosion", {
        start: 0,
        end: 9,
      }),
      repeat: 0,
      frameRate: 20,
    });

    this.anims.create({
      key: "guardStart",
      frames: this.anims.generateFrameNames("knight", {
        prefix: "guard_start/frame",
        start: 0,
        end: 3,
        zeroPad: 4,
      }),
      frameRate: 8,
    });

    this.anims.create({
      key: "guard",
      frames: this.anims.generateFrameNames("knight", {
        prefix: "guard/frame",
        start: 0,
        end: 5,
        zeroPad: 4,
      }),
      frameRate: 8,
      repeat: 2,
    });

    this.anims.create({
      key: "guardEnd",
      frames: this.anims.generateFrameNames("knight", {
        prefix: "guard_end/frame",
        start: 0,
        end: 3,
        zeroPad: 4,
      }),
      frameRate: 8,
    });

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNames("knight", {
        prefix: "idle/frame",
        start: 0,
        end: 5,
        zeroPad: 4,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "attack",
      frames: this.anims.generateFrameNames("knight", {
        prefix: "attack_A/frame",
        start: 0,
        end: 13,
        zeroPad: 4,
      }),
      frameRate: 20,
    });

    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNames("knight", {
        prefix: "run/frame",
        start: 0,
        end: 7,
        zeroPad: 4,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.player.play("idle");

    if (this.input.keyboard) {
      this.input.keyboard.on(
        "keydown-ENTER",
        () => {
          this.player.play("attack").on(
            Phaser.Animations.Events.ANIMATION_COMPLETE,
            () => {
              const explosion = this.add
                .sprite(
                  this.player.x + this.player.displayWidth / 2,
                  this.player.y - this.player.displayHeight / 2,
                  "explosion"
                )
                .play("explosionAnimation");

              explosion.on(
                Phaser.Animations.Events.ANIMATION_COMPLETE,
                () => explosion.destroy(),
                this
              );
            },
            this
          );
        },
        this
      );

      this.input.keyboard.on(
        "keydown-SPACE",
        () => {
          this.player.setVelocityY(-300);
        },
        this
      );

      this.input.keyboard.on("keydown-D", () => {
        if (this.player.x < width - this.player.width) {
          this.player.setVelocityX(300);
          this.player.play("run");
          this.player.flipX = false;
        }
      });

      this.input.keyboard.on("keydown-A", () => {
        if (this.player.x > this.player.width) {
          this.player.setVelocityX(-300);

          this.player.play("run");
          this.player.flipX = true;
        }
      });
    }

    this.physics.add.collider(this.player, platforms);
    this.physics.add.collider(this.enemy, platforms);
  }
}
