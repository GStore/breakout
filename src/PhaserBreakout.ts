import "phaser";

export default class PhaserBreakout extends Phaser.Scene {
  private ball!: Phaser.Physics.Arcade.Sprite;

  constructor(config: Phaser.Types.Core.GameConfig) {
      super(config);
    }

  /**
   * preload
   */
  preload = () => {
    this.scale.scaleMode = Phaser.Scale.ScaleModes.FIT;
    this.scale.autoCenter = Phaser.Scale.CENTER_BOTH;
    this.load.image("ball", "assets/ball.png");
  }

  /**
   * 
   */
  create = () => {
    this.ball = this.physics.add.sprite(50, 50, "ball");
    this.ball.setVelocity(150, 150);
    this.ball.setCollideWorldBounds(true, 1, 1);
  }

  /**
   * update
   */
  update() {
    
  }
}