import "phaser";

export default class PhaserBreakout extends Phaser.Scene {
  private ball!: Phaser.Physics.Arcade.Sprite;
  private paddle!: Phaser.Physics.Arcade.Sprite;
  private bricks!: Phaser.GameObjects.Group;
  private newBrick!: Phaser.Physics.Arcade.Sprite;
  private brickInfo!: any;

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
    this.load.image("brick", "assets/brick.png");
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
    
    this.initBricks();
  }

  /**
   * update
   */
  update = () =>  {
    this.collisionDetection();
    this.paddle.x = this.game.input.activePointer.x || this.game.scale.width*0.5;
    
    if (this.ball.y > 600)
    {
        alert("Game Over");
        location.reload();
    }
  }

  collisionDetection = () => {
    this.physics.collide(this.ball, this.paddle);
    this.physics.collide(this.ball, this.bricks, this.ballHitBrick);
  }

  ballHitBrick = (ball: Phaser.GameObjects.GameObject, brick: Phaser.GameObjects.GameObject) => {
    brick.destroy();
  }

  initBricks = () => {
    this.brickInfo = {
      width: 50,
      height: 20,
      count: {
          row: 3,
          col: 7
      },
      offset: {
          top: 50,
          left: (this.game.scale.width*0.5)/2
      },
      padding: 10
    };

    this.bricks = this.add.group();

    for(let c:number=0; c<this.brickInfo.count.col; c++) {
      for(let r:number=0; r<this.brickInfo.count.row; r++) {
        var brickX = (c*(this.brickInfo.width+this.brickInfo.padding))+this.brickInfo.offset.left;
        var brickY = (r*(this.brickInfo.height+this.brickInfo.padding))+this.brickInfo.offset.top;

        this.newBrick = this.physics.add
          .sprite(brickX, brickY, 'brick')
          .setOrigin(0.5)
          .setImmovable(true);
        //this.physics.enable(newBrick, Phaser.Physics.ARCADE);
        this.bricks.add(this.newBrick);
      }
    }

  }
}