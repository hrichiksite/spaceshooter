function Bullet(xx, yy) {
  this.x = xx;
  this.y = yy;

  this.w = 5;
  this.h = 20;

  this.show = function() {
    ellipse(this.x, this.y, this.w, this.h);
  };
}