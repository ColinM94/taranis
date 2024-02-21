export class EnemyBase {}

export class Enemy extends Phaser.Physics.Arcade.Sprite {
  
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "skeletonAttack");

    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.world.enable(this);

    this.setScale(3.5);
    this.setCollideWorldBounds(true);
    this.setOrigin(1, 1);
    this.body?.setSize(this.width * 0.3, this.height * 0.35);
    this.initAnimations();
  }

  initAnimations() {
    this.anims.create({
      key: "skeletonAttack",
      frames: this.anims.generateFrameNumbers("skeletonAttack", {
        start: 0,
        end: 6,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "skeletonDeath",
      frames: this.anims.generateFrameNumbers("skeletonDeath", {
        start: 0,
        end: 4,
      }),
      frameRate: 10,
    });

    this.anims.play("skeletonAttack", true);
  }

  public kill() {
    this.anims.play("skeletonDeath", true).on("animationcomplete", () => {
      this.destroy();
    });
  }
}
