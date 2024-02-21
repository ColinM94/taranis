import { usePlayerStore } from "store/userPlayerStore";
import { useControlsStore } from "store";
import { Player } from "./player";

export const update = (player: Player) => {
  if (usePlayerStore.getState().health === 0 && !player.isDead) {
    player.isDead = true;
    player.disableBody();
    player.anims.play("die");
    return;
  }

  const currentAnimKey = player.anims.currentAnim?.key;
  const xVelocity = player.body?.velocity.x;
  const yVelocity = player.body?.velocity.y;

  if (yVelocity && yVelocity > 0) {
    player.setDragX(0);
  }

  if (
    xVelocity === 0 &&
    yVelocity === 0 &&
    (currentAnimKey === "run" || currentAnimKey === "jump")
  ) {
    player.anims.play("idle");
  }

  if (player.flipX === true) {
    player.body?.setSize(player.width * 0.5);
    player.body?.setOffset(player.width * 0.4, 0);
  } else {
    player.body?.setSize(player.width * 0.5);
    player.body?.setOffset(player.width * 0.1, 0);
  }

  const velocity = 225;

  const controls = useControlsStore.getState();

  if (controls.dPadLeft) {
    player.setVelocityX(-velocity);
    player.flipX = true;
    player.anims.play("run", true);
  }

  if (controls.dPadRight) {
    player.setVelocityX(velocity);
    player.flipX = false;
    player.anims.play("run", true);
  }
  if (controls.dPadDown) {
    player.anims.play("attackB", true);
    player.setVelocityX(0);
  }

  if (controls.aPressed) {
    player.anims.play("jump", true);
    // player.anims.chain("jumpLoop");
    player.setVelocityY(-velocity);
  }

  if (controls.yPressed) {
    player.anims.play("attack", true);
    player.setVelocityX(0);
  }

  if (controls.bPressed) {
    player.anims.play("attackB", true);
    player.setVelocityX(0);
  }

  if (controls.xPressed) {
    player.anims.play("attackC", true);
    player.setVelocityX(0);
  }

  if (player.body?.touching.down) {
    if (
      !player.keyA?.isDown &&
      !player.keyD?.isDown &&
      player.body?.touching.down
    ) {
      player.setVelocityX(0);
    }
    if (player.keyW?.isDown) {
      player.anims.play("jump", true);
      // player.anims.chain("jumpLoop");
      player.setVelocityY(-velocity);
    } else if (player.keyA?.isDown) {
      player.setVelocityX(-velocity);
      player.flipX = true;
      player.anims.play("run", true);
    } else if (player.keyS?.isDown) {
      player.setVelocityX(velocity);
      player.anims.play("run", true);
    } else if (player.keyD?.isDown) {
      player.setVelocityX(velocity);
      player.anims.play("run", true);
      player.flipX = false;
    } else if (player.keyQ?.isDown) {
      player.anims.play("attackB", true);
      player.setVelocityX(0);
    } else if (player.keyE?.isDown) {
      player.anims.play("attackC", true);
      player.setVelocityX(0);
    } else if (player.KeySpace?.isDown) {
      player.anims.play("attack", true);
      player.setVelocityX(0);
    }
  }
};
