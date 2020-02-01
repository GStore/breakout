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