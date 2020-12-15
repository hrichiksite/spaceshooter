var w, h;
var rocketPic;
var SPACE = 32; 
var points = 0;
var alienKills = 0;
var gameOn = true;

var level = 1;
var alienGenerationSpeed = 90; 

function generateAliens(numberOfAliensToGenerate) {
  if (numberOfAliensToGenerate == 0) {
    hero.waitingForAlienGeneration = false;
    return;
  }

  setTimeout(
    function() {
      generateOneRandomSpeedAlien();
      generateAliens(numberOfAliensToGenerate - 1);
    },
    alienGenerationSpeed
  );
}

function generateOneAlien() {
  hero.aliens.push(new Alien(0, 0));
}

function generateOneRandomSpeedAlien() {
  var alien = new Alien(0, 0);
  alien.speed = Math.floor(Math.random() * 70) + 10; 
  hero.aliens.push(alien);
}

var shootingSound;



function setup() {
  createCanvas(1500, 800);
  w = width;
  h = height;
  hero = new Hero('rocket.png');
}

var hero;

function draw() {
  background(255, 255, 255); 
  background(0);

  hero.show();


  showPoints();
  showKills();
  showLevel();

  if (keyIsPressed) {
    keyPressed();
  }
}


function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    hero.moveRight();
  } else if (keyCode === LEFT_ARROW) {
    hero.moveLeft();
  }
}

function keyReleased() {
  if (keyCode === SPACE || keyCode === UP_ARROW) {
    hero.shoot();
  }
}

function showPoints() {
  textSize(32);
  fill(255, 255, 255);
  text(points.toString(), width / 8, height / 8);
}

function showKills() {
  textSize(32);
  fill(255, 255, 255);
  text(`Alien Kills: ${alienKills.toString()}`, width / 8 - 60, height / 8 + 40);
}

function showLevel() {
  textSize(32);
  fill(255, 255, 255);
  text(`Level: ${level}`, width / 8 - 30, height / 8 + 80);
}

function mousePressed() {
  hero.aliens.push(new Alien(0, 0));
}