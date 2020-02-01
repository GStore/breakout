
// get canvas element
let canvas = document.getElementById("breakoutCanvas");
// get a 2d context for canvas element
let ctx = new ContextPath2D(canvas.getContext("2d"));
let squares = [
  ["#FF0000", 0, 40, 50, 50],
  ["rgba(0, 0, 255, 0.5)", 160, 10, 100, 40]
];

let circles = [
  ["green", 240, 160, 20, 0, Math.PI*2, false]

];
for(let square of squares) {
  ctx.fillStyle(square[0]);
  ctx.square(square[1],square[2],square[3], square[4]);
}
for(let circle of circles) {
  ctx.fillStyle(circle[0]);
  ctx.circle(circle[1],circle[2],circle[3], circle[4],circle[5],circle[6]);
}