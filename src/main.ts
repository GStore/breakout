import {ContextPath2D} from "./ContextPath2D";
import { Breakout } from "./lesson";

// get canvas element
let canvas: HTMLCanvasElement = document.getElementById("breakoutCanvas") as HTMLCanvasElement;
let ctx = new ContextPath2D(canvas?.getContext("2d"));
const breakout = new Breakout(ctx, canvas);


setInterval(breakout.draw, 10);