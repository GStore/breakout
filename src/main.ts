import {ContextPath2D} from "./ContextPath2D";
import { Lesson2 } from "./lesson2";

// get canvas element
let canvas: HTMLCanvasElement = document.getElementById("breakoutCanvas") as HTMLCanvasElement;
let ctx = new ContextPath2D(canvas?.getContext("2d"));
const lesson2 = new Lesson2(ctx, canvas);


setInterval(lesson2.draw, 10);