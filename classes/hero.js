// hero class (bottom of the screen)
function Hero(img) {

  this.pic = loadImage(img);
  this.bullets = [];
  this.aliens = [new Alien(0, 0)];
  this.waitingForAlienGeneration = false;

  //this.shootSound = loadSound('shootingSound.mp3');

  // TODO: not really working
  // the width and height of the
  this.w = this.pic.width;
  this.h = this.pic.height;

  // positioning of the hero on the screen
  this.x = width / 2;
  this.y = height - 128;


  this.bulletSpeed = 30;
  this.moveBy = 10;

  this.show = function() {
    //console.log(this.numberOfAliens());
    if (gameOn) {
      // the person gets a point each frame
      points++;
    }

    // show the hero
    image(this.pic, this.x, this.y);

    for (a of this.aliens) {
      // because of the way i delete elements, I have to check for undefineds
      if (a) {
        a.show();
        a.move();
      }
    }

    // show the bullets
    for (b in this.bullets) {
      if (this.bullets[b]) {
        this.bullets[b].show();
      }
    }

    // check for collisions between bullets and aliens
    for (a in this.aliens) {
      for (b in this.bullets) {
        // check for undefined deletions
        if (this.aliens[a]) {
          if (this.bullets[b]) {
            if (this.aliens[a].hasCollidedWith(this.bullets[b])) {
              delete this.aliens[a];
              delete this.bullets[b];
              alienKills++;
            }
          }
        }
      }
    }

    // check if an alien has collided with the hero
    for (a of this.aliens) {
      if (a) {
        if (a.hasCollidedWithHero(this, this.pic.width)) {
          gameOn = false;
          alert(`You died!👽.\nYour scores were: ${alienKills} alien kills and ${points} points`);
          window.location = "home.html";
        }
      }
    }


    // if he killed all of the aliens, then make his level bigger and add more so he loses, just kidding
    if (this.numberOfAliens() == 0 && this.waitingForAlienGeneration == false) {
      ///console.log("generating aliens");
      // if you don't set this to true, it will call the setTimeout function every frame until 4 seconds later
      this.waitingForAlienGeneration = true;
      setTimeout(function() {
        level++; // he is at a new level
        generateAliens(level);
      }, 4000); // give the guy a 4 second break between rounds
    }


    // move the bullets for the next frame
    this.moveBullets();
  };

  this.moveRight = function() {
    this.x += this.moveBy;

    // make sure the rocket cannot go off of the screen
    if (this.x + this.pic.width > width) {
      this.x = width - this.pic.width;
    }
  };

  // because I use `delete aliens[index]`, I cannot use aliens.length to get its length. The deleted spots show up in the .length
  this.numberOfAliens = function() {
    let counter = 0;
    for (a in this.aliens) {
      counter++;
    }
    return counter;
  }

  this.moveLeft = function() {
    this.x -= this.moveBy;

    // make sure the rocket cannot go off of the left side of the screen
    if (this.x < 0) {
      this.x = 0;
    }
  };

  // show the bullets flying across the screen
  this.moveBullets = function() {
    for (b in this.bullets) {
      if (this.bullets[b]) {
        this.bullets[b].y -= this.bulletSpeed;
      }
    }
  };

  // add bullets the array
  this.shoot = function() {

    //this.shootSound.play();

    // add a new bullet at the position of the hero
    this.bullets.push(new Bullet(this.x + this.pic.width / 2, this.y));
    // shootingSound.play();
  };

}