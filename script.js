const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

//16:9
canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, canvas.width, canvas.height);

class Sprite {
  constructor(position) {
    this.position = position;
  }

  draw(colour) {
    ctx.fillStyle = colour;
    ctx.fillRect(this.position.x, this.position.y, 50, 150);
  }
}

const player = new Sprite({
  x: 0,
  y: 0,
});

player.draw("red");

const enemy = new Sprite({
  x: 975,
  y: 100,
});

enemy.draw("blue");

console.log(player);
