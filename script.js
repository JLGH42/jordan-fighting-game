const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

//16:9
canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;
class Sprite {
  constructor({ position, velocity, colour, height, width, isAttacking }) {
    this.colour = colour;
    this.position = position;
    this.velocity = velocity;
    this.height = height;
    this.width = width;
    this.lastKey;
    this.attackBox = {
      colour: "green",
      position: this.position,
      width: 100,
      height: 50,
    };
    this.isAttacking = false;
  }

  draw(colour) {
    ctx.fillStyle = colour;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

    //attackBox
    ctx.fillStyle = this.attackBox.colour;
    ctx.fillRect(
      this.attackBox.position.x,
      this.attackBox.position.y,
      this.attackBox.width,
      this.attackBox.height
    );
  }

  update() {
    this.draw(this.colour);
    //velocity
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    //stopping object when it reaches the ground
    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    }
    //gravity
    else {
      this.velocity.y += gravity;
    }
  }
  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}

const player = new Sprite({
  colour: "red",
  height: 150,
  width: 50,
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

const enemy = new Sprite({
  colour: "blue",
  height: 150,
  width: 50,
  position: {
    x: 900,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  arrowR: {
    pressed: false,
  },
  arrowL: {
    pressed: false,
  },
};

function animate() {
  window.requestAnimationFrame(animate);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  //player movement
  if (keys.a.pressed && player.lastKey === "a") {
    player.velocity.x = -5;
  } else if (keys.d.pressed && player.lastKey === "d") {
    player.velocity.x = 5;
  }

  //enemy movement
  if (keys.arrowR.pressed && enemy.lastKey === "ArrowRight") {
    enemy.velocity.x = 5;
  } else if (keys.arrowL.pressed && enemy.lastKey === "ArrowLeft") {
    enemy.velocity.x = -5;
  }

  //collision detection

  if (
    player.attackBox.position.x + player.attackBox.width >= enemy.position.x &&
    player.attackBox.position.x <= enemy.position.x + enemy.width &&
    player.attackBox.position.y + player.attackBox.height >= enemy.position.y &&
    player.attackBox.position.y <= enemy.position.y + enemy.height &&
    player.isAttacking
  ) {
    console.log("attack");
  }

  player.update();
  enemy.update();
}

animate();

window.addEventListener("keydown", (e) => {
  console.log(e.key);
  // anytime you press down on a key, e is an object holding the key property
  switch (e.key) {
    case "d":
      keys.d.pressed = true;
      player.lastKey = "d";
      break;
    case "a":
      keys.a.pressed = true;
      player.lastKey = "a";
      break;
    case "w":
      player.velocity.y = -15;
      break;
    case " ":
      player.attack();
      break;

    case "ArrowRight":
      keys.arrowR.pressed = true;
      enemy.lastKey = "ArrowRight";
      break;
    case "ArrowLeft":
      keys.arrowL.pressed = true;
      enemy.lastKey = "ArrowLeft";
      break;
    case "ArrowUp":
      enemy.velocity.y = -15;
      break;
  }
});

window.addEventListener("keyup", (e) => {
  // anytime you lift off of a key, e is an object holding the key property
  switch (e.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
      
    case "ArrowRight":
      keys.arrowR.pressed = false;
      break;
    case "ArrowLeft":
      keys.arrowL.pressed = false;
      break;
  }
});
