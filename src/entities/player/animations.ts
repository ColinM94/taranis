import { Player } from "./player";

export const animations = (player: Player) => {
  player.anims.create({
    key: "guardStart",
    frames: player.anims.generateFrameNames("knight", {
      prefix: "guard_start/frame",
      start: 0,
      end: 3,
      zeroPad: 4,
    }),
    frameRate: 8,
  });

  player.anims.create({
    key: "guardEnd",
    frames: player.anims.generateFrameNames("knight", {
      prefix: "guard_end/frame",
      start: 0,
      end: 3,
      zeroPad: 4,
    }),
    frameRate: 8,
  });

  player.anims.create({
    key: "idle",
    frames: player.anims.generateFrameNames("knight", {
      prefix: "idle/frame",
      start: 0,
      end: 5,
      zeroPad: 4,
    }),
    frameRate: 8,
    repeat: -1,
  });

  player.anims.create({
    key: "attack",
    frames: player.anims.generateFrameNames("knight", {
      prefix: "attack_A/frame",
      start: 0,
      end: 13,
      zeroPad: 4,
    }),
    frameRate: 20,
  });

  player.anims.create({
    key: "attackB",
    frames: player.anims.generateFrameNames("knight", {
      prefix: "attack_B/frame",
      start: 0,
      end: 12,
      zeroPad: 4,
    }),
    frameRate: 20,
  });

  player.anims.create({
    key: "attackC",
    frames: player.anims.generateFrameNames("knight", {
      prefix: "attack_C/frame",
      start: 0,
      end: 12,
      zeroPad: 4,
    }),
    frameRate: 20,
  });

  player.anims.create({
    key: "run",
    frames: player.anims.generateFrameNames("knight", {
      prefix: "run/frame",
      start: 0,
      end: 7,
      zeroPad: 4,
    }),
    frameRate: 10,
  });

  player.anims.create({
    key: "die",
    frames: player.anims.generateFrameNames("knight", {
      prefix: "die/frame",
      start: 0,
      end: 9,
      zeroPad: 4,
    }),
    frameRate: 10,
  });

  player.anims.create({
    key: "jump",
    frames: player.anims.generateFrameNames("knight", {
      prefix: "jump_start/frame",
      start: 0,
      end: 3,
      zeroPad: 4,
    }),
    frameRate: 40,
  });

  player.anims.create({
    key: "jumpLoop",
    frames: player.anims.generateFrameNames("knight", {
      prefix: "jump_loop/frame",
      start: 0,
      end: 2,
      zeroPad: 4,
    }),
    frameRate: 10,
  });

  player.anims.play("idle");
};
