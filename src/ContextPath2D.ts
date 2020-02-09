export class ContextPath2D implements IContextPath2D {
  private ctx!: CanvasRenderingContext2D | undefined | null;
  
  constructor(ctx?: CanvasRenderingContext2D | null) {
    this.ctx = ctx;
  }

  beginPath = (): IContextPath2D => {
    // console.log("beginPath");
    this.ctx?.beginPath()
    return this; 
  }

  rect = (x: number, y: number, w: number, h: number): IContextPath2D => {
    // console.log("rect");
    this.ctx?.rect(x, y, w, h);
    return this;
  }

  fillStyle = (colour: string | CanvasGradient | CanvasPattern): IContextPath2D=> {
    // console.log("fillStyle");
    if(this.ctx) {
      this.ctx.fillStyle = colour;
    }
    return this;
  }

  fill = (): IContextPath2D => {
    // console.log("fill");
    this.ctx?.fill();
    return this;
  }

  closePath = (): IContextPath2D => {
    // console.log("closePath");
    this.ctx?.closePath();
    return this;
  }

  arc = (x: number, y: number, radius: number, startAngle: number, endAngle: number, antiClockwise: boolean | undefined): IContextPath2D => {
    // console.log("arc");
    this.ctx?.arc(x, y, radius, startAngle, endAngle, antiClockwise);
    return this;
  }

  clearRect = (x: number, y: number, w: number, h: number): IContextPath2D => {
    this.ctx?.clearRect(x, y, w, h);
    return this;
  }

  square = (x: number, y: number, w: number, h: number): IContextPath2D => {
    // console.log("square");
    this
      .beginPath()
      .rect(x, y, w, h)
      .fill()
      .closePath();
    return this;
  }

  circle = (x: number, y: number, radius: number, startAngle: number, 
            endAngle: number, antiClockwise: boolean | undefined): IContextPath2D => {
    // console.log("circle");
    this
      .beginPath()
      .arc(x, y, radius, startAngle, endAngle, antiClockwise)
      .fill()
      .closePath();
    return this;
  }
  
  font = (fontStyle: string): IContextPath2D => {
    if(this.ctx) {
      this.ctx.font = fontStyle;
    }    
    return this;
  }

  fillText = (text: string, x: number, y: number): IContextPath2D => {
    this.fillText(text, x, y);
    return this;
  }
  
}