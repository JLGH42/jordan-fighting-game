class Sprite {
  constructor({ position, height, width, imageSrc }) {
    this.position = position;
    this.height = height;
    this.width = width;
    this.image = new Image();
    this.image.src = imageSrc;
  }

  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }

  update() {
    this.draw();
  }
}

class Fighter {
  constructor({ position, velocity, colour, height, width, offset }) {
    this.colour = colour;
    this.position = position;
    this.velocity = velocity;
    this.height = height;
    this.width = width;
    this.lastKey;
    this.attackBox = {
      colour: "green",
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset,
      width: 100,
      height: 50,
    };
    this.health = 100;
    this.isAttacking;
  }

  draw(colour) {
    ctx.fillStyle = colour;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

    //attackBox
    if (this.isAttacking) {
      ctx.fillStyle = this.attackBox.colour;
      ctx.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height
      );
    }
  }

  update() {
    this.draw(this.colour);
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;

    //velocity
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    //stopping object when it reaches the ground
    if (this.position.y + this.height + this.velocity.y >= canvas.height - 30) {
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
