import { useControlsStore, useKeyBindsStore } from "store";
import { usePlayerStore } from "store/userPlayerStore";
import { animations } from "./animations";
import { update } from "./update";

const keyBinds = useKeyBindsStore.getState();

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

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "knight");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setScale(4);
    this.setCollideWorldBounds(true);
    this.setOrigin(0, 1);
    this.initControls(scene);

    this.setDragX(500);

    animations(this);
  }

  initControls(scene: Phaser.Scene) {
    if (!scene?.input.keyboard) return;

    this.keyW = scene.input.keyboard?.addKey("W");
    this.keyS = scene.input.keyboard?.addKey("S");
    this.keyA = scene.input.keyboard?.addKey("A");
    this.keyD = scene.input.keyboard?.addKey("D");
    this.keyQ = scene.input.keyboard?.addKey("Q");
    this.keyE = scene.input.keyboard?.addKey("E");
    this.KeySpace = scene.input.keyboard?.addKey("SPACE");

    keyBinds.setMoveLeftCallback(() => {
      this.setVelocityX(-225);
      this.flipX = true;
    });

    keyBinds.setMoveRightCallback(() => {
      this.setVelocityX(225);
      this.flipX = false;
    });
  }

  update() {
    const xVelocity = this.body?.velocity.x;
    const yVelocity = this.body?.velocity.y;

    if (xVelocity) {
      this.anims.play("run", true);
    }

    // if (this.flipX) {
    //   this.swordHitBox?.setX(this.body.x - this.swordHitBox.width);
    // } else {
    //   this.swordHitBox?.setX(this.body.x + this.body.width);
    // }
    // if (usePlayerStore.getState().health === 0 && !this.isDead) {
    //   this.isDead = true;
    //   this.disableBody();
    //   this.anims.play("die");
    //   return;
    // }
    // const currentAnimKey = this.anims.currentAnim?.key;
    // const xVelocity = this.body?.velocity.x;
    // const yVelocity = this.body?.velocity.y;
    // if (yVelocity && yVelocity > 0) {
    //   this.setDragX(0);
    // }
    // if (
    //   xVelocity === 0 &&
    //   yVelocity === 0 &&
    //   (currentAnimKey === "run" || currentAnimKey === "jump")
    // ) {
    //   this.anims.play("idle");
    // }
    // if (this.flipX === true) {
    //   this.body?.setSize(this.width * 0.5);
    //   this.body?.setOffset(this.width * 0.4, 0);
    // } else {
    //   this.body?.setSize(this.width * 0.5);
    //   this.body?.setOffset(this.width * 0.1, 0);
    // }
    // const velocity = 225;
    // const controls = useControlsStore.getState();
    // if (controls.dPadLeft) {
    //   this.setVelocityX(-velocity);
    //   this.flipX = true;
    //   this.anims.play("run", true);
    // }
    // if (controls.dPadRight) {
    //   this.setVelocityX(velocity);
    //   this.flipX = false;
    //   this.anims.play("run", true);
    // }
    // if (controls.dPadDown) {
    //   this.anims.play("attackB", true);
    //   this.setVelocityX(0);
    // }
    // if (controls.aPressed) {
    //   this.anims.play("jump", true);
    //   // this.anims.chain("jumpLoop");
    //   this.setVelocityY(-velocity);
    // }
    // if (controls.yPressed) {
    //   this.anims.play("attack", true);
    //   this.setVelocityX(0);
    // }
    // if (controls.bPressed) {
    //   this.anims.play("attackB", true);
    //   this.setVelocityX(0);
    // }
    // if (controls.xPressed) {
    //   this.anims.play("attackC", true);
    //   this.setVelocityX(0);
    // }
    // if (this.body?.touching.down) {
    //   if (
    //     !this.keyA?.isDown &&
    //     !this.keyD?.isDown &&
    //     this.body?.touching.down
    //   ) {
    //     this.setVelocityX(0);
    //   }
    //   if (this.keyW?.isDown) {
    //     this.anims.play("jump", true);
    //     // this.anims.chain("jumpLoop");
    //     this.setVelocityY(-velocity);
    //   } else if (this.keyA?.isDown) {
    //     this.setVelocityX(-velocity);
    //     this.flipX = true;
    //     this.anims.play("run", true);
    //   } else if (this.keyS?.isDown) {
    //     this.setVelocityX(velocity);
    //     this.anims.play("run", true);
    //   } else if (this.keyD?.isDown) {
    //     this.setVelocityX(velocity);
    //     this.anims.play("run", true);
    //     this.flipX = false;
    //   } else if (this.keyQ?.isDown) {
    //     this.anims.play("attackB", true);
    //     this.setVelocityX(0);
    //   } else if (this.keyE?.isDown) {
    //     this.anims.play("attackC", true);
    //     this.setVelocityX(0);
    //   } else if (this.KeySpace?.isDown) {
    //     this.anims.play("attack", true);
    //     this.setVelocityX(0);
    //   }
    // }
  }
}
