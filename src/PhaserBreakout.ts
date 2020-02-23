import "phaser";
import { Tweens, Physics } from "phaser";

export default class PhaserBreakout extends Phaser.Scene {
  private ball!: Phaser.Physics.Arcade.Sprite;
  private paddle!: Phaser.Physics.Arcade.Sprite;
  private bricks!: Phaser.GameObjects.Group;
  private newBrick!: Phaser.Physics.Arcade.Sprite;
  private brickInfo!: any;
  private scoreText!: Phaser.GameObjects.Text;
  private score  = 0;
  private textStyle =  { font: '18px Arial', fill: '#0095DD' };
  private lives: number = 3;
  private livesText!: Phaser.GameObjects.Text;
  private lifeLost!: Phaser.GameObjects.Text;
  private playing:boolean = false;
  private startButton!: Phaser.Physics.Arcade.Sprite;

  constructor(config: Phaser.Types.Core.GameConfig) {
      super(config);
    }

  /**
   * preload
   */
  preload = () => {
    this.scale.scaleMode = Phaser.Scale.ScaleModes.FIT;
    this.scale.autoCenter = Phaser.Scale.CENTER_BOTH;
    //this.load.image("ball", "assets/ball.png");
    this.load.spritesheet("ball", "assets/wobble.png", {
      frameWidth: 20
    });
    this.load.image("paddle", "assets/paddle.png");
    this.load.image("brick", "assets/brick.png");
    this.load.spritesheet("button", "assets/button.png", {
      frameWidth: 120,
      frameHeight: 40
    });
  }

  /**
   * 
   */
  create = () => {
    this.physics.world.setBoundsCollision(true, true, true, false);
    this.physics.world.checkCollision.down = false;
    this.scoreText = this.add.text(5,5, "Points: 0", this.textStyle);
    this.livesText = this.add.text(this.game.scale.width - 5, 5, `Lives: ${this.lives}`, this.textStyle);
    this.livesText.setOrigin(1,0);
    this.lifeLost = this.add.text(this.game.scale.width * 0.5, this.game.scale.height * 0.5, "Life lost, click to continue", this.textStyle);
    this.lifeLost.setOrigin(0.5);
    this.lifeLost.setVisible(false);

    this.startButton = this.physics.add
      .sprite(this.game.scale.width * 0.5, this.game.scale.height * 0.5, "button")
      .setOrigin(0.5)
      .setInteractive();
    
    this.startButton.once(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
      this.playing = true;
      this.startButton.setVisible(false);
      this.ball.setVelocity(150, - 150);
    });

    this.ball = this.physics.add
      .sprite(this.game.scale.width*0.5, this.game.scale.height-25, "ball")
      .setCollideWorldBounds(true)
      .setBounce(1)
      .setOrigin(0.5);
  
    this.ball.anims.animationManager.create({
      key: "wobble",
      frames: [
        { frame: 0, key: "ball" },
        { frame: 1, key: "ball" },
        { frame: 0, key: "ball" },
        { frame: 2, key: "ball" },
        { frame: 0, key: "ball" },
        { frame: 1, key: "ball" },
        { frame: 0, key: "ball" },
        { frame: 2, key: "ball" },
        { frame: 0, key: "ball" }
      ],
      frameRate: 24
    })

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
    if(this.playing) {
      this.paddle.x = this.game.input.activePointer.x || this.game.scale.width*0.5;
    }    
    
    if (this.ball.y > 600)
    {
      this.ballLeavesScreen();
    }
  }

  ballLeavesScreen = () => {
    this.lives--;
    this.livesText.setText(`Lives: ${this.lives}`);
    this.playing = false;
    if(this.lives) {      
      this.lifeLost.setVisible(true);
      this.ball.body.reset(this.game.scale.width * 0.5, this.game.scale.height -25);
      this.paddle.body.reset(this.game.scale.width * 0.5, this.game.scale.height - 5);

      this.input.once(Phaser.Input.Events.POINTER_DOWN, () => {
        this.playing = true;
        this.lifeLost.setVisible(false);
        this.ball.setVelocity(150 , -150);
      });
    }
    else {
      alert("Game Over");
      location.reload();
    }

  }

  collisionDetection = () => {
    this.physics.collide(this.ball, this.paddle, this.ballHitPaddle);
    this.physics.collide(this.ball, this.bricks, this.ballHitBrick);
  }

  ballHitPaddle  = (ball: Phaser.GameObjects.GameObject, paddle: Phaser.GameObjects.GameObject) => {
    const theBall: Phaser.Physics.Arcade.Sprite = ball as Phaser.Physics.Arcade.Sprite;
    theBall.anims.play("wobble");
    theBall.body.velocity.x = -1*5*(this.paddle.x-this.ball.x);
  }

  ballHitBrick = (ball: Phaser.GameObjects.GameObject, brick: Phaser.GameObjects.GameObject) => {
    this.tweens.add({
      targets: brick,
      scale: 0,
      duration: 100,
      ease: Phaser.Math.Easing.Linear.Linear
    })
    .once(Phaser.Tweens.Events.TWEEN_COMPLETE, () => {
      (brick as Physics.Arcade.Sprite).setVisible(false);
    });;

    this.score+=10;
    this.scoreText.setText(`Points: ${String(this.score)}`);

    if(this.bricks.countActive() === 0) {
      alert('You won the game, congratulations!');
      location.reload();
    }
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