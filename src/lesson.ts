import { ContextPath2D } from "./ContextPath2D";

export class Breakout {
  private x!: number;
  private y!: number;
  private dx: number = 2;
  private dy: number = -2;
  private ballRadius: number = 10;

  private paddleHeight: number = 10;
  private paddleWidth: number = 75;
  private paddleX: number = (this.canvas.width-this.paddleWidth) / 2;
  private rightPressed: boolean = false;
  private leftPressed: boolean = false;

  constructor(private ctx: ContextPath2D, private canvas: HTMLCanvasElement) {
    this.x = canvas.width/2;
    this.y = canvas.height/2;
  }

  checkY = () => {
    if(this.y + this.dy > this.canvas.height - this.ballRadius || this.y + this.dy < this.ballRadius) {
      this.dy = -this.dy;
    }
  }

  checkX = () => {
    if(this.x + this.dx > this.canvas.width - this.ballRadius || this.x + this.dx < this.ballRadius) {
      this.dx = -this.dx;
    }
  }

  checkPaddle = () => {
    if(this.rightPressed) {
      this.paddleX += 7;
      if (this.paddleX + this.paddleWidth > this.canvas.width){
        this.paddleX = this.canvas.width - this.paddleWidth;
      }
    }

    if(this.leftPressed) {
      this.paddleX += -7;
      if (this.paddleX < 0){
        this.paddleX = 0;
      }
    }
  }

  draw = () => {
    this.checkY();
    this.checkX();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle("#0095DD")
            .circle(this.x, this.y, this.ballRadius, 0, Math.PI*2);
    this.ctx.fillStyle("#0095DD")
            .square(this.paddleX, this.canvas.height-this.paddleHeight, this.paddleWidth, this.paddleHeight);

    this.x += this.dx;
    this.y += this.dy;
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
}