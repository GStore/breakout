import "phaser";

export default class PhaserBreakout extends Phaser.Scene {
  private ball!: Phaser.Physics.Arcade.Sprite;
  private paddle!: Phaser.Physics.Arcade.Sprite;

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
    this.load.image("paddle", "assets/paddle.png");
  }

  /**
   * 
   */
  create = () => {
    this.ball = this.physics.add.sprite(this.game.scale.width*0.5, this.game.scale.height-25, "ball");
    this.ball.setOrigin(0.5);
    this.ball.setVelocity(150, -150);
    this.ball.setCollideWorldBounds(true);
    this.ball.setBounce(1);

    this.paddle = this.physics.add.sprite(this.game.scale.width*0.5, this.game.scale.height-5*0.5, "paddle");
    this.paddle.setOrigin(0.5, 1);
    this.paddle.body.immovable = true;
    this.paddle.setBounce(1);
  }

  /**
   * update
   */
  update() {
    this.physics.collide(this.ball, this.paddle);
    this.paddle.x = this.game.input.activePointer.x || this.game.scale.width*0.5;
  }
}