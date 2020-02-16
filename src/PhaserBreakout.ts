import "phaser";

export default class PhaserBreakout extends Phaser.Scene {
  private ball!: any;

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
    this.ball = this.add.sprite(50, 50, "ball");
  }

  /**
   * update
   */
  update() {
    
  }
}