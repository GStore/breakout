import {ContextPath2D} from "./ContextPath2D";
import { Breakout } from "./Breakout";
import "./main.css";

// get canvas element
const getCanvas = (): HTMLCanvasElement => {
  const canvas:  HTMLCanvasElement = document.createElement("canvas");
  canvas.width = 480;
  canvas.height=320;
  const body: HTMLElement =  document.body;
  body.prepend(canvas);
  return canvas;
}

const getContextPathBuilder = (canvas: HTMLCanvasElement): IContextPath2D => {
  return new ContextPath2D(canvas.getContext("2d"));
}

let canvas = getCanvas();
let ctx = getContextPathBuilder(canvas);

const breakoutArgs: IBreakoutVariables = {
  ctx: ctx,
  canvas: canvas
} as IBreakoutVariables;

const breakout = new Breakout(breakoutArgs);

document.addEventListener("keydown", breakout.keyDown, false);
document.addEventListener("keyup", breakout.keyUp, false);
document.addEventListener("mousemove", breakout.mouseMoveHandler, false);
breakout.run();