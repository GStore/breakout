import {ContextPath2D} from "./ContextPath2D";
import { Breakout } from "./lesson";

// get canvas element
let canvas: HTMLCanvasElement = document.getElementById("breakoutCanvas") as HTMLCanvasElement;
let ctx = new ContextPath2D(canvas?.getContext("2d"));
const breakoutArgs: IBreakoutVariables = {
  ctx: ctx,
  canvas: canvas
} as IBreakoutVariables;

const breakout = new Breakout(breakoutArgs);

document.addEventListener("keydown", breakout.keyDown, false);
document.addEventListener("keyup", breakout.keyUp, false);
breakout.run();