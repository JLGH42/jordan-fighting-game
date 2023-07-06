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
