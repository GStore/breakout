import { ContextPath2D } from "./ContextPath2D";

export class Breakout {
  private x!: number;
  private y!: number;
  private dx: number = 2;
  private dy: number = -2;
  private ballRadius: number = 10;

  constructor(private ctx: ContextPath2D, private canvas: HTMLCanvasElement) {
    this.x = canvas.width/2;
    this.y = canvas.height/2;
  }

  checkY = () => {
    if(this.y + this.dy > this.canvas.height || this.y + this.dy < 0) {
      this.dy = -this.dy;
    }
  }

  checkX = () => {
    if(this.x + this.dx > this.canvas.width || this.x + this.dx < 0) {
      this.dx = -this.dx;
    }
  }

  draw = () => {
    this.checkY();
    this.checkX();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle("#0095DD");
    this.ctx.circle(this.x, this.y, this.ballRadius, 0, Math.PI*2);
    this.x += this.dx;
    this.y += this.dy;
  }
}