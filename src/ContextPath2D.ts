export class ContextPath2D {
  //private _ctx: CanvasRenderingContext2D;
  constructor(private ctx: CanvasRenderingContext2D | undefined | null) {
    
  }

  beginPath = (): ContextPath2D => {
    // console.log("beginPath");
    this.ctx?.beginPath()
    return this; 
  }

  rect = (x: number, y: number, w: number, h: number): ContextPath2D => {
    // console.log("rect");
    this.ctx?.rect(x, y, w, h);
    return this;
  }

  fillStyle = (colour: string | CanvasGradient | CanvasPattern): ContextPath2D=> {
    // console.log("fillStyle");
    if(this.ctx) {
      this.ctx.fillStyle = colour;
    }
    return this;
  }

  fill = (): ContextPath2D => {
    // console.log("fill");
    this.ctx?.fill();
    return this;
  }

  closePath = (): ContextPath2D => {
    // console.log("closePath");
    this.ctx?.closePath();
    return this;
  }

  arc = (x: number, y: number, radius: number, startAngle: number, endAngle: number, antiClockwise: boolean | undefined): ContextPath2D => {
    // console.log("arc");
    this.ctx?.arc(x, y, radius, startAngle, endAngle, antiClockwise);
    return this;
  }

  clearRect = (x: number, y: number, w: number, h: number): ContextPath2D => {
    this.ctx?.clearRect(x, y, w, h);
    return this;
  }

  square = (x: number, y: number, w: number, h: number) => {
    // console.log("square");
    this
      .beginPath()
      .rect(x, y, w, h)
      .fill()
      .closePath();
    return this;
  }

  circle = (x: number, y: number, radius: number, startAngle: number, 
            endAngle: number, antiClockwise?: boolean | undefined): ContextPath2D => {
    // console.log("circle");
    this
      .beginPath()
      .arc(x, y, radius, startAngle, endAngle, antiClockwise)
      .fill()
      .closePath();
    return this;
  } 
}