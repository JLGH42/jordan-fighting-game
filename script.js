const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

//16:9
canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, canvas.width, canvas.height);

class Sprite {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
  }

  draw(colour) {
    ctx.fillStyle = colour;
    ctx.fillRect(this.position.x, this.position.y, 50, 150);
  }
}

const player = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  velocity: 0,
});

player.draw("red");

const enemy = new Sprite({
  position: {
    x: 975,
    y: 100,
  },
  velocity: 0,
});

enemy.draw("blue");

function animate() {
  window.requestAnimationFrame(animate);
}

animate();

console.log(player);
