// Name any p5.js functions we use in the global so Glitch can recognize them.
/* global
 *    createCanvas, width, height, windowWidth, windowHeight,
 *    colorMode, HSB,
 *    background,
 *    random,
 *    fill,
 *    noStroke,
 *    circle
 *    createSlider
 *    textSize
 *    text
 *    collidePointCircle
 *    mouseX
 *    mouseY
 *    ellipse
 *    key_code
 *    UP_ARROW
 *    DOWN_ARROW
 *    RIGHT_ARROW
 *    LEFT_ARROW
 *    keyIsPressed
 *    collideCircleCircle
 *    rect
 *    keyCode
 */

let balls = [],player1,player2;
let numBalls = 30;
let timer = 0;
let fps = 0;
let gameOver = false;

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  colorMode(HSB, 360, 100, 100);
  player1 = new Player(1);
  player2 = new Player(2);
  for (let i = 0; i < numBalls; i++) {
    balls.push(new Ball());
  }
}

function draw() {
  background(220, 0, 80);
  fill(100, 100, 100);

  rect(0, 0, width, height / 10);
  rect(0, (9 * height) / 10, width, (9 * height) / 10);
  fill(0, 100, 0);
  text("The first one to reach here is the winner!!!", width / 2, 20);

  if (!gameOver){
    player1.display();
    player2.display();

    if (keyIsPressed) {
      player1.move();
      fill(0, 100, 0);
      player2.move();
    }


    for (let i = 0; i < balls.length; i++) {
      balls[i].float();
      balls[i].display();
      player1.health(balls[i]);
      player2.health(balls[i]);
    }
    fps++;
    if (fps == 60) {
      timer++;
      fps = 0;
    }
    fill(0, 100, 0);
    text("Timer: " + timer, 10, 40);
    player1.win();
    player2.win();
  }
  
  else{
    if (player1.win() > 0){
      text("Player 1 wins!", width / 2, height / 2);
    }
    if(player2.win() > 0){
      text("Player 2 wins!", width/2,height/2)
      
    }
  } 
}

// Ball class to create the obstacle
class Ball {
  constructor() {
    // Randomly generate position
    this.x = random(width);
    this.y = random(height / 10, (9 * height) / 10);
    // Randomly generate radius
    this.r = random(7, 12);
    // Randomly generate color
    this.color = random(360);
    // Randomly generate a master velocity (broken into components)...
    this.masterXvelocity = random(0.5, 2);
    this.masterYvelocity = random(0.5, 2);
    // ...and use those as starting velocities.
    this.xVelocity = this.masterXvelocity;
    this.yVelocity = this.masterYvelocity;
  }

  float() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
    // Standard bounce code - like the DVD logo, but for spheres.
    if (this.x + this.r > width) {
      this.xVelocity = -1 * this.masterXvelocity;
    }
    if (this.x - this.r < 0) {
      this.xVelocity = this.masterXvelocity;
    }
    if (this.y + this.r > (9 * height) / 10) {
      this.yVelocity = -1 * this.masterYvelocity;
    }
    if (this.y - this.r < height / 10) {
      this.yVelocity = this.masterYvelocity;
    }
  }
  display() {
    fill(this.color, 100, 100);
    noStroke();
    circle(this.x, this.y, this.r * 2);
  }
}

class Player {
  constructor(playerNum) {
    this.playerNum = playerNum;
    this.x = random(width);
    this.y = height - 45;
    this.r = 15;
  }

  move() {
    if (this.playerNum == 1) {
      if (keyIsPressed === true && keyCode === UP_ARROW && (this.y >= 5)) {
        this.y -= 5;
      }
      if (keyIsPressed === true && keyCode === DOWN_ARROW && (this.y + 2 * this.r < height)) {
        this.y += 5;
      }
      if (keyIsPressed === true && keyCode === LEFT_ARROW && (this.x > 5)) {
        this.x -= 5;
      }
      if (keyIsPressed === true && keyCode === RIGHT_ARROW && (this.x + 2 * this.r < width - 5)) {
        this.x += 5;
      }
    }
    
    if (this.playerNum == 2) {
      if (keyIsPressed === true && keyCode == 87 && (this.y >= 5)) {
        this.y -= 5;
      }
      if (keyIsPressed === true && keyCode == 83 && (this.y + 2 * this.r < height)) {
        this.y += 5;
      }
      if (keyIsPressed === true && keyCode == 65 && (this.x > 5)) {
        this.x -= 5;
      }
      if (keyIsPressed === true && keyCode == 68 && (this.x + 2 * this.r < width - 5)) {
        this.x += 5;
      }
    }
  }

  health(ball) {
    if (
      collideCircleCircle(this.x, this.y, this.r * 2, ball.x, ball.y, ball.r)
    ) {
      this.x = random(width);
      this.y = height - 25;
    }
  }

  display() {
    if (this.playerNum == 1) {
      fill(0, 100, 0);
      noStroke();
      rect(this.x, this.y, this.r * 2);
    }
    if (this.playerNum == 2) {
      fill(0, 100, 100);
      noStroke();
      rect(this.x, this.y, this.r * 2);
    }
  }
  
  win(){
    if(this.y < height/10)
      {
        gameOver = true;
        return (this.playerNum);
      }
    else{
      return 0;
    }
  }
}
