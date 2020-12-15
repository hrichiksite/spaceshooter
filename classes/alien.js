
function Alien(xx, yy) {
  this.x = xx;
  this.y = yy;

  this.speed = 30;
  this.maxRows = 6;
  this.currentRow = 1;
  this.wallPixels = height / this.maxRows;
  this.wallCounter = 0;
  this.hasHitWall = false;
  this.right = true;

  this.pic = loadImage('pics/ufoeli.png');



  this.show = function() {
    image(this.pic, this.x, this.y);
  }

  // TODO: make the alien path
  this.move = function() {
    // move the alien
    if (!this.hasHitWall && this.right) {
      this.x += this.speed;
    } else if (!this.hasHitWall && !this.right) {
      this.x -= this.speed;
    } else if (this.hasHitWall) {
      this.y += this.speed;
      this.wallCounter += this.speed;
    }

    /**
     * check to see what has happened. Should the next action be to go down, left, or right.
     * The logic order here is very important.
     * Checking if the alien has hit the wall HAS to come before checking if the wall length frames is done
     */



    // if the alien has hit a wall, then change the hasHitWall variable and the moving right variable
    if ((this.x + this.pic.width >= width || this.x <= 0) && this.wallCounter == 0) {
      this.hasHitWall = true;
      this.right = !this.right;
    }

    // if the wall has been gone through the wall
    if (this.wallCounter >= this.wallPixels) {
      this.hasHitWall = false;
      this.wallCounter = 0;
    }


  }


  this.hasCollidedWith = function(a) {
    if (a.y < 0 - a.w) return false;
    if (a.y <= this.y + this.pic.height && a.x >= this.x && a.x <= this.x + this.pic.width) {
      return true;
    }
  }

  this.hasCollidedWithHero = function(a, w) {
    if (a.y < 0 - w) return false;
    if (a.y <= this.y + this.pic.height && a.x >= this.x && a.x <= this.x + this.pic.width) {
      return true;
    }
  }


}