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
  imageSrc: "./images/MedievalKing/Sprites/Idle.png",
  framesMax: 8,
  framesHold: 5,
  scale: 2.5,
  offset: { x: 155, y: 143 },
  attackBox: {
    offset: {
      x: 99,
      y: 25,
    },
    width: 122,
    height: 50,
  },
  sprites: {
    idle: {
      imageSrc: "./images/MedievalKing/Sprites/Idle.png",
      framesMax: 8,
    },
    run: {
      imageSrc: "./images/MedievalKing/Sprites/Run.png",
      framesMax: 8,
    },
    jump: {
      imageSrc: "./images/MedievalKing/Sprites/Jump.png",
      framesMax: 2,
    },
    fall: {
      imageSrc: "./images/MedievalKing/Sprites/Fall.png",
      framesMax: 2,
    },
    attack1: {
      imageSrc: "./images/MedievalKing/Sprites/Attack1.png",
      framesMax: 4,
    },
    idleLeft: {
      imageSrc: "./images/MedievalKing/Sprites/IdleLeft.png",
      framesMax: 8,
    },
    runLeft: {
      imageSrc: "./images/MedievalKing/Sprites/RunLeft.png",
      framesMax: 8,
    },
    jumpLeft: {
      imageSrc: "./images/MedievalKing/Sprites/JumpLeft.png",
      framesMax: 2,
    },
    fallLeft: {
      imageSrc: "./images/MedievalKing/Sprites/FallLeft.png",
      framesMax: 2,
    },
    attack1Left: {
      imageSrc: "./images/MedievalKing/Sprites/Attack1Left.png",
      framesMax: 4,
    },
  },
  lastDirection: "right",
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
  imageSrc: "./images/HeroKnight/Sprites/Idle.png",
  framesMax: 11,
  framesHold: 5,
  scale: 2.5,
  offset: { x: 155, y: 162 },
  attackBox: {
    offset: {
      x: 0,
      y: 25,
    },
    width: 110,
    height: 50,
  },
  sprites: {
    idle: {
      imageSrc: "./images/HeroKnight/Sprites/Idle.png",
      framesMax: 11,
    },
    run: {
      imageSrc: "./images/HeroKnight/Sprites/Run.png",
      framesMax: 8,
    },
    jump: {
      imageSrc: "./images/HeroKnight/Sprites/Jump.png",
      framesMax: 3,
    },
    fall: {
      imageSrc: "./images/HeroKnight/Sprites/Fall.png",
      framesMax: 3,
    },
    attack1: {
      imageSrc: "./images/HeroKnight/Sprites/Attack1.png",
      framesMax: 7,
    },
    idleLeft: {
      imageSrc: "./images/HeroKnight/Sprites/IdleLeft.png",
      framesMax: 11,
    },
    runLeft: {
      imageSrc: "./images/HeroKnight/Sprites/RunLeft.png",
      framesMax: 8,
    },
    jumpLeft: {
      imageSrc: "./images/HeroKnight/Sprites/JumpLeft.png",
      framesMax: 3,
    },
    fallLeft: {
      imageSrc: "./images/HeroKnight/Sprites/FallLeft.png",
      framesMax: 3,
    },
    attack1Left: {
      imageSrc: "./images/HeroKnight/Sprites/Attack1Left.png",
      framesMax: 7,
    },
  },
  lastDirection: "left",
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
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  //player movement
  if (keys.a.pressed && player.lastKey === "a") {
    player.velocity.x = -5;
    player.attackBox.offset.x = -129;
    player.switchSprite("runLeft");
    player.lastDirection = "left";
  } else if (keys.d.pressed && player.lastKey === "d") {
    player.velocity.x = 5;
    player.attackBox.offset.x = 99;
    player.switchSprite("run");
    player.lastDirection = "right";
  } else {
    if (player.lastDirection === "right") {
      player.switchSprite("idle");
      player.attackBox.offset.x = 99;
    } else {
      player.switchSprite("idleLeft");
      player.attackBox.offset.x = -129;
    }
  }

  //player jump animation
  if (player.velocity.y < 0) {
    if (player.lastDirection === "right") {
      player.switchSprite("jump");
      player.attackBox.offset.x = 99;
    } else {
      player.switchSprite("jumpLeft");
      player.attackBox.offset.x = -129;
    }
  } else if (player.velocity.y > 0) {
    if (player.lastDirection === "right") {
      player.switchSprite("fall");
      player.attackBox.offset.x = 99;
    } else {
      player.switchSprite("fallLeft");
      player.attackBox.offset.x = -129;
    }
  }

  //enemy movement
  if (keys.arrowR.pressed && enemy.lastKey === "ArrowRight") {
    enemy.velocity.x = 5;
    enemy.attackBox.offset.x = 75;
    enemy.switchSprite("run");
    enemy.lastDirection = "right";
  } else if (keys.arrowL.pressed && enemy.lastKey === "ArrowLeft") {
    enemy.velocity.x = -5;
    enemy.attackBox.offset.x = -45;
    enemy.switchSprite("runLeft");
    enemy.lastDirection = "left";
  } else {
    if (enemy.lastDirection === "right") {
      enemy.attackBox.offset.x = 75;
      enemy.switchSprite("idle");
    } else {
      enemy.attackBox.offset.x = -45;
      enemy.switchSprite("idleLeft");
    }
  }

  //enemy jump animation
  if (enemy.velocity.y < 0) {
    if (enemy.lastDirection === "right") {
      enemy.attackBox.offset.x = 75;
      enemy.switchSprite("jump");
    } else {
      enemy.attackBox.offset.x = -45;
      enemy.switchSprite("jumpLeft");
    }
  } else if (enemy.velocity.y > 0) {
    if (enemy.lastDirection === "right") {
      enemy.attackBox.offset.x = 75;
      enemy.switchSprite("fall");
    } else {
      enemy.attackBox.offset.x = -d45;
      enemy.switchSprite("fallLeft");
    }
  }

  //player attack collision
  if (
    rectangularCollision({ rectangle1: player, rectangle2: enemy }) &&
    player.isAttacking &&
    player.framesCurrent === 2
  ) {
    player.isAttacking = false;
    enemy.health -= 20;
    document.getElementById("player-2-health-bar").style.width =
      enemy.health + "%";
  }

  //player misses
  if (player.isAttacking && player.framesCurrent === 2) {
    player.isAttacking = false;
  }

  //enemy attack collision
  if (
    rectangularCollision({ rectangle1: enemy, rectangle2: player }) &&
    enemy.isAttacking && enemy.framesCurrent === 4
  ) {
    enemy.isAttacking = false;
    player.health -= 20;
    document.getElementById("player-1-health-bar").style.width =
      player.health + "%";
  }

  //enemy misses
  if (enemy.isAttacking && enemy.framesCurrent === 4) {
    enemy.isAttacking = false;
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
    case "l":
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
