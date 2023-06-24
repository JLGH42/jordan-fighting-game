const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

//16:9
canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, canvas.width, canvas.height);

class Sprite {
  constructor({ position, velocity, colour }) {
    this.colour = colour;
    this.position = position;
    this.velocity = velocity;
  }

  draw(colour) {
    ctx.fillStyle = colour;
    ctx.fillRect(this.position.x, this.position.y, 50, 150);
  }

  update() {
    this.draw(this.colour);
    this.position.y = this.position.y + this.velocity.y;
  }
}

const player = new Sprite({
  colour: "red",
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 1.4,
  },
});

const enemy = new Sprite({
  colour: "blue",
  position: {
    x: 975,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 1.4,
  },
});

function animate() {
  window.requestAnimationFrame(animate);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();
}

animate();

console.log(player);
