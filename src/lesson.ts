import { ContextPath2D } from "./ContextPath2D";

const squares = [
  ["#FF0000", 0, 40, 50, 50],
  ["rgba(0, 0, 255, 0.5)", 160, 10, 100, 40]
];

const circles = [
  ["green", 240, 160, 20, 0, Math.PI*2, false]

];

export const Lesson1 = (ctx: ContextPath2D) => {
  for(let square of squares) {
    ctx.fillStyle(String(square[0]));
    ctx.square(Number(square[1]),Number(square[2]),Number(square[3]), Number(square[4]));
  }
  for(let circle of circles) {
    ctx.fillStyle(String(circle[0]));
    ctx.circle(Number(circle[1]),Number(circle[2]), Number(circle[3]), Number(circle[4]), Number(circle[5]), Boolean(circle[6]));
  }
}