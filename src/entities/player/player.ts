import { animations } from "./animations";
import { useInput, useInput2 } from "store";

const input = useInput.getState();

export class Player extends Phaser.Physics.Arcade.Sprite {
  keyW: Phaser.Input.Keyboard.Key | undefined;
  keyA: Phaser.Input.Keyboard.Key | undefined;
  keyS: Phaser.Input.Keyboard.Key | undefined;
  keyD: Phaser.Input.Keyboard.Key | undefined;
  keyQ: Phaser.Input.Keyboard.Key | undefined;
  keyE: Phaser.Input.Keyboard.Key | undefined;
  KeySpace: Phaser.Input.Keyboard.Key | undefined;
  enemy: Phaser.Physics.Arcade.Sprite | undefined;
  swordHitBox: Phaser.Types.Physics.Arcade.ImageWithDynamicBody | undefined;
  isDead = false;
  inputIndex: number | undefined;
  swordHitbox: Phaser.GameObjects.Rectangle | undefined;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    inputIndex: number,
    flipX: boolean = false
  ) {
    super(scene, x, y, "knight");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setScale(4);
    this.setCollideWorldBounds(true);
    this.setOrigin(0, 1);
    this.setDragX(500);

    this.body?.setSize(this.width * 0.75, this.height);
    // this.body?.setOffset(0, 0);

    this.inputIndex = inputIndex;
    this.flipX = flipX;

    animations(this);

    input.on("jump", () => {
      alert("Do something");
    });

    // this.swordHitbox = scene.add
    //   .rectangle(
    //     this.x + this.displayWidth,
    //     this.y - this.displayHeight / 3,
    //     this.displayWidth / 4,
    //     this.displayHeight / 4,
    //     0x00ff00
    //   )
    //   .setOrigin(0, 1);

    // // this.swordHitbox.body?.setAllowGravity(false);
    // scene.physics.world.enable(this.swordHitbox);
  }

  update() {
    let input;

    if (this.inputIndex === 0) {
      input = useInput.getState();
    } else if (this.inputIndex === 1) {
      input = useInput2.getState();
    }

    const xVelocity = this.body?.velocity.x;
    // const yVelocity = this.body?.velocity.y;

    if (xVelocity) {
      this.anims.play("run", true);
    }

    if (input?.moveLeft.isPressed === true) {
      this.setVelocityX(-225);
      this.flipX = true;
    }

    if (input?.moveRight.isPressed === true) {
      this.setVelocityX(225);
      this.flipX = false;
    }

    if (input?.attack.isPressed) {
      this.anims.play("attack", true);
    }

    if (input?.attackSecondary.isPressed) {
      this.anims.play("attackB", true);
    }

    if (input?.attackTertiary.isPressed) {
      this.anims.play("attackC", true);
    }

    if (input?.jump.isPressed) {
      this.setVelocityY(-225);
    }

    // if (this.swordHitBox) {
    //   this.swordHitbox?.setX(this.x + this.displayWidth);
    //   this.swordHitbox?.setY(this.y - this.displayHeight / 3);
    // }
  }
}
