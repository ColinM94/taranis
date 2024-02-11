class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(screen: Phaser.Scene, x: number, y: number) {
    super(screen, x, y, knight);

    this.initAnimations();
  }

  initAnimations() {}

  update(): void {}
}
