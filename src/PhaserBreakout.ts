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
    this.physics.world.setBoundsCollision(true, true, true, false);
    this.physics.world.checkCollision.down = false;

    this.ball = this.physics.add
      .sprite(this.game.scale.width*0.5, this.game.scale.height-25, "ball")
      .setCollideWorldBounds(true)
      .setBounce(1)
      .setOrigin(0.5)
      .setVelocity(150, -150);
    

    this.paddle = this.physics.add
      .sprite(this.game.scale.width*0.5, this.game.scale.height-5*0.5, "paddle")
      .setOrigin(0.5, 1)
      .setImmovable(true)
      .setBounce(1);    
  }

  /**
   * update
   */
  update() {
    this.physics.collide(this.ball, this.paddle);
    this.paddle.x = this.game.input.activePointer.x || this.game.scale.width*0.5;

    if (this.ball.y > 600)
    {
        alert("Game Over");
        location.reload();
    }
  }
}