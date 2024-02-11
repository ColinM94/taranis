export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "knight");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setScale(4);
    this.setBounce(0.2);
    this.setCollideWorldBounds(true);

    this.initAnimations();
    this.initControls(scene);
  }

  initAnimations() {
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
      key: "attackB",
      frames: this.anims.generateFrameNames("knight", {
        prefix: "attack_B/frame",
        start: 0,
        end: 12,
        zeroPad: 4,
      }),
      frameRate: 20,
    });

    this.anims.create({
      key: "attackC",
      frames: this.anims.generateFrameNames("knight", {
        prefix: "attack_C/frame",
        start: 0,
        end: 12,
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
  }

  initControls(scene: Phaser.Scene) {
    if (!scene?.input?.keyboard) return;

    if (scene.input.keyboard) {
      scene.input.keyboard.on("keydown", (event: KeyboardEvent) => {
        console.log(event);
        const key = event.key.toLowerCase();
        switch (key) {
          case "w":
            if (this.body?.touching.down) {
              this.setVelocityY(-160);
            }
            break;
          case "a":
            this.setVelocityX(-160);
            this.anims.play("run", true);
            this.flipX = true;
            break;
          case "s":
            this.setVelocityX(160);
            this.anims.play("run", true);
            break;
          case "d":
            this.setVelocityX(160);
            this.anims.play("run", true);
            this.flipX = false;
            break;

          case "q":
            this.anims.play("attackB", true);
            this.setVelocityX(0);
            break;

          case "e":
            this.anims.play("attackC", true);
            this.setVelocityX(0);
            break;

          case " ":
            this.anims.play("attack", true);
            this.setVelocityX(0);
            break;
        }
      });
    }
  }
}
