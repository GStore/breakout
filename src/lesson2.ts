import { ContextPath2D } from "./ContextPath2D";

export class Lesson2 {
  private x!: number;
  private y!: number;
  private dx: number = 2;
  private dy: number = -2;

  constructor(private ctx: ContextPath2D, private canvas: HTMLCanvasElement) {
    this.x = canvas.width/2;
    this.y = canvas.height/2;
  }

  draw = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle("#0095DD");
    this.ctx.circle(this.x, this.y, 10, 0, Math.PI*2);
    this.x += this.dx;
    this.y += this.dy;
  }
}