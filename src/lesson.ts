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

const PADDLEWIDTH: number = 75;
const PADDLEHEIGHT: number = 10;
const REFRESHRATE: number = 10;
const BALLMOVEX: number = 2;
const BALLMOVEY: number = -2;

export class Breakout {
  
  private ballPosition: IPosition = {} as IPosition;
  private ballChange: IPosition = { x: BALLMOVEX, y: BALLMOVEY} as IPosition;
  private ballRadius: number = 10;
  private interval!: number;

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
  }

  checkY = () => {
    if(this.ballPosition.y + this.ballChange.y < this.ballRadius) {
      this.ballChange.y = -this.ballChange.y;
    } else if(this.ballPosition.y + this.ballChange.y > this.canvas.height - this.ballRadius) {
      alert("Game Over");
      document.location.reload();
      clearInterval(this.interval);
    }
  }

  checkX = () => {
    if(this.ballPosition.x + this.ballChange.x > this.canvas.width - this.ballRadius || this.ballPosition.x + this.ballChange.x < this.ballRadius) {
      this.ballChange.x = -this.ballChange.x;
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

  drawGameObjects = () => {
    this.clearGameArea();
    this.drawBall();
    this.drawPaddle();
    
  }

  draw = () => {
    this.drawGameObjects();
    this.checkY();
    this.checkX();
    
    this.ballPosition.x += this.ballChange.x;
    this.ballPosition.y += this.ballChange.y;
    this.checkPaddle();
    
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