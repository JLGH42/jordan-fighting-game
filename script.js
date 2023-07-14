const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

//16:9
canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 1.5;

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./images/Background.png",
  framesMax: 1,
});

const shop = new Sprite({
  position: {
    x: 730,
    y: 227,
  },
  imageSrc: "./images/shop.png",
  framesMax: 6,
  scale: 2.5,
});

const player = new Fighter({
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
  offset: {
    x: 0,
    y: 0,
  },
  imageSrc: "./images/MedievalKing/Sprites/Idle.png",
  framesMax: 8,
  framesHold: 5,
  scale: 2.5,
  offset: { x: 155, y: 143 },
  sprites: {
    idle: {
      imageSrc: "./images/MedievalKing/Sprites/Idle.png",
      framesMax: 8
    },
    run: {
      imageSrc: "./images/MedievalKing/Sprites/Run.png",
      framesMax: 8
    } 
  }
});

const enemy = new Fighter({
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
  offset: {
    x: -50,
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

decreaseTimer();

function animate() {
  window.requestAnimationFrame(animate);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  shop.update();
  player.update();
  // enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  //player movement
  player.image = player.sprites.idle.image
  if (keys.a.pressed && player.lastKey === "a") {
    player.velocity.x = -5;
    player.image = player.sprites.run.image
  } else if (keys.d.pressed && player.lastKey === "d") {
    player.velocity.x = 5;
    player.image = player.sprites.run.image
  }

  //enemy movement
  if (keys.arrowR.pressed && enemy.lastKey === "ArrowRight") {
    enemy.velocity.x = 5;
  } else if (keys.arrowL.pressed && enemy.lastKey === "ArrowLeft") {
    enemy.velocity.x = -5;
  }

  //player attack collision
  if (
    rectangularCollision({ rectangle1: player, rectangle2: enemy }) &&
    player.isAttacking
  ) {
    player.isAttacking = false;
    enemy.health -= 20;
    document.getElementById("player-2-health-bar").style.width =
      enemy.health + "%";
  }

  //enemy attack collision
  if (
    rectangularCollision({ rectangle1: enemy, rectangle2: player }) &&
    enemy.isAttacking
  ) {
    enemy.isAttacking = false;
    player.health -= 20;
    document.getElementById("player-1-health-bar").style.width =
      player.health + "%";
  }

  //end game based on health
  if (enemy.health <= 0 || player.health <= 0) {
    determineWinner({ player, enemy, timerId });
  }
}

window.onload = function () {
  animate();
};

window.addEventListener("keydown", (e) => {
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
      player.velocity.y = -20;
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
      enemy.velocity.y = -20;
      break;
    case "Shift":
      enemy.attack();
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
