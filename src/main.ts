import {ContextPath2D} from "./ContextPath2D";
import { Breakout } from "./Breakout";

let canvas: HTMLCanvasElement;
let ctx: IContextPath2D; 
const getCanvas = (): HTMLCanvasElement => {
  return document.getElementById("breakoutCanvas") as HTMLCanvasElement;
}

const getContextPath2d = (canvas: HTMLCanvasElement): ContextPath2D => {
  return new ContextPath2D(canvas.getContext("2d")); 
}

canvas = getCanvas();
ctx = getContextPath2d(canvas);

const breakoutArgs: IBreakoutVariables = {
  ctx: ctx,
  canvas: canvas,
  document: document
} as IBreakoutVariables;

const breakout = new Breakout(breakoutArgs);
breakout.run();