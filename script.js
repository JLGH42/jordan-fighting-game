const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

//16:9
canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

const player = new Fighter({
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
  offset: {
    x: 0,
    y: 0,
  },
});

const enemy = new Fighter({
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

function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <=
      rectangle2.position.y + rectangle2.height &&
    rectangle1.isAttacking
  );
}

function determineWinner({ player, enemy, timerId }) {
  clearTimeout(timerId);
  condition.style.display = "flex";
  if (player.health === enemy.health) {
    condition.innerHTML = "Draw";
  } else if (player.health > enemy.health) {
    condition.innerHTML = "Player 1 Wins!";
  } else if (enemy.health > player.health) {
    condition.innerHTML = "Player 2 Wins!";
  }
}

let timer = 60;
let timerId;
const condition = document.getElementById("condition");
function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000);
    --timer;
    document.getElementById("timer").innerHTML = timer;
  }

  if (timer === 0) {
    determineWinner({ player, enemy, timerId });
  }
}

decreaseTimer();

function animate() {
  window.requestAnimationFrame(animate);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();

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

animate();

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
