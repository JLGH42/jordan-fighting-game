const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

//16:9
canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.4;
class Sprite {
  constructor({ position, velocity, colour, height, width }) {
    this.colour = colour;
    this.position = position;
    this.velocity = velocity;
    this.height = height;
    this.width = width;
  }

  draw(colour) {
    ctx.fillStyle = colour;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
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
    x: 975,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

function animate() {
  window.requestAnimationFrame(animate);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();
}

animate();

window.addEventListener("keydown", (e) => {
  // anytime you press down on a key, e is an object holding the key property
  switch (e.key) {
    case "d":
      player.velocity.x = 1;
      break;
    case "a":
      player.velocity.x = -1;
      break;
    case "w":
      break;
    case "s":
      break;
  }
});

window.addEventListener("keyup", (e) => {
    // anytime you lift off of a key, e is an object holding the key property
    switch (e.key) {
      case "d":
        player.velocity.x = 0;
        break;
      case "a":
        player.velocity.x = 0;
        break;
      case "w":
        break;
      case "s":
        break;
    }
  });
