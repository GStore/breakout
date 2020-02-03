import { ContextPath2D } from "./ContextPath2D";
interface IPosition {
  x: number,
  y: number
}

interface IPaddle {
  height: number,
  width: number,
  x: number
}

interface IBrick extends IPosition {
  visible: boolean
}

const PADDLEWIDTH: number = 75;
const PADDLEHEIGHT: number = 10;
const REFRESHRATE: number = 10;
const BALLMOVEX: number = 2;
const BALLMOVEY: number = -2;
const BRICKCOLUMNCOUNT: number = 5;
const BRICKROWCOUNT: number = 3;
const BRICKWIDTH: number = 75;
const BRICKHEIGHT: number = 20;
const BRICKPADDING: number = 10;
const BRICKOFFSETTOP: number = 30;
const BRICKOFFSETLEFT: number = 30;

export class Breakout {
  
  private ballPosition: IPosition = {} as IPosition;
  private ballChange: IPosition = { x: BALLMOVEX, y: BALLMOVEY} as IPosition;
  private ballRadius: number = 10;
  private interval!: number;
  private bricks: IBrick[][] = [];

  private paddle: IPaddle = {
    height: PADDLEHEIGHT,
    width: PADDLEWIDTH,
    x: (this.canvas.width-PADDLEWIDTH) / 2
  }
  private rightPressed: boolean = false;
  private leftPressed: boolean = false;

  constructor(private ctx: ContextPath2D, private canvas: HTMLCanvasElement) {
    this.ballPosition.x = canvas.width/2;
    this.ballPosition.y = canvas.height/2;
    this.createBricks();
  }

  checkY = () => {
    if(this.ballPosition.y + this.ballChange.y < this.ballRadius) {
      this.ballChange.y = -this.ballChange.y;
    } 
    else if(this.ballPosition.y + this.ballChange.y > this.canvas.height - this.ballRadius) {
      if(this.ballPosition.x > this.paddle.x && this.ballPosition.x < this.paddle.x + this.paddle.width) {
        this.ballChange.y = -this.ballChange.y;
      } 
      else {
        alert("Game Over");
        document.location.reload();
        clearInterval(this.interval);
      }
    }
  }

  checkX = () => {
    if(this.ballPosition.x + this.ballChange.x > this.canvas.width - this.ballRadius || this.ballPosition.x + this.ballChange.x < this.ballRadius) {
      this.ballChange.x = -this.ballChange.x;
    }
  }

  collisionDetection = () => {
    for(let c=0; c<BRICKCOLUMNCOUNT; c++) {
      for(let r=0; r<BRICKROWCOUNT; r++) {
        const currentBrick = this.bricks[c][r];
        if(currentBrick.visible) {
          if(this.ballPosition.x > currentBrick.x 
              && this.ballPosition.x < currentBrick.x+BRICKWIDTH 
              && this.ballPosition.y > currentBrick.y 
              && this.ballPosition.y < currentBrick.y+BRICKHEIGHT) {
                this.ballChange.y = -this.ballChange.y;
                currentBrick.visible = false;
              }
        }
      }
    }
  }

  checkPaddle = () => {
    if(this.rightPressed) {
      this.paddle.x += 7;
      if (this.paddle.x + this.paddle.width > this.canvas.width){
        this.paddle.x = this.canvas.width - this.paddle.width;
      }
    }

    if(this.leftPressed) {
      this.paddle.x += -7;
      if (this.paddle.x < 0){
        this.paddle.x = 0;
      }
    }
  }

  clearGameArea = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawBall = () => {
    this.ctx
      .fillStyle("#0095DD")
      .circle(this.ballPosition.x, this.ballPosition.y, this.ballRadius, 0, Math.PI*2);
  }

  drawPaddle = () => {
    this.ctx
      .fillStyle("#0095DD")
      .square(this.paddle.x, this.canvas.height-this.paddle.height, this.paddle.width, this.paddle.height);
  }

  drawBricks = () => {
    for(let c=0; c<BRICKCOLUMNCOUNT;c++) {
      for(let r=0; r<BRICKROWCOUNT;r++) {
        this.bricks[c][r].x = (c*(BRICKWIDTH+BRICKPADDING))+BRICKOFFSETLEFT;
        this.bricks[c][r].y = (r*(BRICKHEIGHT+BRICKPADDING))+BRICKOFFSETTOP;
        if(this.bricks[c][r].visible) {
          this.ctx
            .fillStyle("#0095DD")
            .square(this.bricks[c][r].x , this.bricks[c][r].y, BRICKWIDTH, BRICKHEIGHT);
        }
      }
    }
  }

  createBricks = () => {
    for(let c=0; c<BRICKCOLUMNCOUNT; c++) {
        this.bricks[c] = [];
        for(let r=0; r<BRICKROWCOUNT; r++) {
            this.bricks[c][r] = { x: 0, y: 0, visible: true };
        }
    }
  }

  drawGameObjects = () => {
    this.clearGameArea();
    this.drawBricks();
    this.drawBall();
    this.drawPaddle();
        
  }

  draw = () => {
    this.drawGameObjects();
    this.collisionDetection();
    this.checkY();
    this.checkX();
    this.checkPaddle();

    this.ballPosition.x += this.ballChange.x;
    this.ballPosition.y += this.ballChange.y;
    
    
    
  }

  keyDown = (event: KeyboardEvent) => {
    if(event.key == "Right" || event.key == "ArrowRight") {
      this.rightPressed = true;
    }
    else if(event.key == "Left" || event.key == "ArrowLeft") {
        this.leftPressed = true;
    }
  }
  
  keyUp = (event: KeyboardEvent) => {
    if(event.key == "Right" || event.key == "ArrowRight") {
      this.rightPressed = false;
    }
    else if(event.key == "Left" || event.key == "ArrowLeft") {
        this.leftPressed = false;
    }
  }

  run = () => {
    this.interval = setInterval(this.draw, REFRESHRATE);
  }
}