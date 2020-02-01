
function ContextPath2D(ctx) {
  this.ctx = ctx;
}

ContextPath2D.prototype.beginPath = function() {
  console.log("beginPath");
  this.ctx.beginPath()
  return this;
}

ContextPath2D.prototype.rect = function(x, y, w, h) {
  console.log("rect");
  this.ctx.rect(x, y, w, h);
  return this;
}

ContextPath2D.prototype.fillStyle = function(colour) {
  console.log("fillStyle");
  this.ctx.fillStyle = colour;
  return this;
}

ContextPath2D.prototype.fill = function() {
  console.log("fill");
  this.ctx.fill();
  return this;
}

ContextPath2D.prototype.closePath = function() {
  console.log("closePath");
  this.ctx.closePath();
  return this;
}

ContextPath2D.prototype.arc = function(x, y, radius, startAngle, endAngle, antiClockwise) {
  console.log("arc");
  this.ctx.arc(x, y, radius, startAngle, endAngle, antiClockwise);
  return this;
}

ContextPath2D.prototype.square = function(x, y, w, h) {
  console.log("square",this);
  this
    .beginPath()
    .rect(x, y, w, h)
    .fill()
    .closePath();
  return this;
}

ContextPath2D.prototype.circle = function(x, y, radius, startAngle, endAngle, antiClockwise) {
  console.log("circle",this);
  this
    .beginPath()
    .arc(x, y, radius, startAngle, endAngle, antiClockwise)
    .fill()
    .closePath();
  return this;
}
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
  // ctx
  //   .fillStyle("green")
  //   .circle(40, 160, 20, 0, Math.PI*2, false)
  //   .fillStyle("#FF0000")
  //   .square(40, 200, 20, 20);
