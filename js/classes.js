class Sprite {
  constructor({
    position,
    height,
    width,
    imageSrc,
    scale = 1,
    framesMax = 1,
    framesCurrent = 0,
    framesElapsed = 0,
    framesHold = 13,
    offset = { x: 0, y: 0 },
  }) {
    this.position = position;
    this.height = height;
    this.width = width;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.framesMax = framesMax;
    this.framesCurrent = framesCurrent;
    this.framesElapsed = framesElapsed;
    this.framesHold = framesHold;
    this.offset = offset;
  }

  animateFrames() {
    this.framesElapsed++;

    if (this.framesElapsed % this.framesHold === 0) {
      //frameshift logic
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent++;
      } else {
        this.framesCurrent = 0;
      }
    }
  }

  draw() {
    ctx.drawImage(
      this.image,
      //cropping properties
      this.framesCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      //image rendering properties
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale
    );
  }

  update() {
    this.draw();
    this.animateFrames();
  }
}

class Fighter extends Sprite {
  constructor({
    position,
    velocity,
    colour,
    height,
    width,
    imageSrc,
    scale,
    framesMax,
    framesCurrent,
    framesElapsed,
    framesHold,
    offset,
    sprites,
    lastDirection,
    attackBox = { offset: {}, width: undefined, height: undefined },
  }) {
    super({
      imageSrc,
      scale,
      framesMax,
      framesCurrent,
      framesElapsed,
      framesHold,
      position,
      offset,
    });
    this.colour = colour;
    this.velocity = velocity;
    this.height = height;
    this.width = width;
    this.lastKey;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset: attackBox.offset,
      width: attackBox.width,
      height: attackBox.height,
    };
    this.health = 100;
    this.isAttacking;
    this.sprites = sprites;
    this.lastDirection = lastDirection;
    this.dead = false;

    for (const sprite in this.sprites) {
      this.sprites[sprite].image = new Image();
      this.sprites[sprite].image.src = this.sprites[sprite].imageSrc;
    }
  }

  update() {
    this.draw();
    if (!this.dead) {
      this.animateFrames();
    }

    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

    //drawing atk boxes
    // ctx.fillRect(
    //   this.attackBox.position.x,
    //   this.attackBox.position.y,
    //   this.attackBox.width,
    //   this.attackBox.height
    // );

    //velocity
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    //stopping object when it reaches the ground
    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
      this.position.y = 426;
    }
    //gravity
    else {
      this.velocity.y += gravity;
    }
  }
  attack() {
    this.isAttacking = true;
    if (this.lastDirection === "right") {
      this.switchSprite("attack1");
    } else if (this.lastDirection === "left") {
      this.switchSprite("attack1Left");
    }
  }

  takeHit() {
    this.health -= 20;
    if (this.health <= 0) {
      this.death();
    }
    if (this.lastDirection === "right") {
      this.switchSprite("takeHit");
    } else if (this.lastDirection === "left") {
      this.switchSprite("takeHitLeft");
    }
  }

  death() {
    if (this.lastDirection === "right") {
      this.switchSprite("death");
    } else if (this.lastDirection === "left") {
      this.switchSprite("deathLeft");
    }
  }

  switchSprite(sprite) {
    if (
      this.image === this.sprites.death.image ||
      this.image === this.sprites.deathLeft.image
    ) {
      if (
        this.framesCurrent === this.sprites.death.framesMax - 1 ||
        this.framesCurrent === this.sprites.deathLeft.framesMax - 1
      )
        this.dead = true;
        return
    }
    if (
      (this.image === this.sprites.attack1.image &&
        this.framesCurrent < this.sprites.attack1.framesMax - 1) ||
      (this.image === this.sprites.attack1Left.image &&
        this.framesCurrent < this.sprites.attack1Left.framesMax - 1) ||
      (this.image === this.sprites.takeHit.image &&
        this.framesCurrent < this.sprites.takeHit.framesMax - 1) ||
      (this.image === this.sprites.takeHitLeft.image &&
        this.framesCurrent < this.sprites.takeHitLeft.framesMax - 1)
    )
      return;
    switch (sprite) {
      case "idle":
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image;
          this.framesMax = this.sprites.idle.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "run":
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image;
          this.framesMax = this.sprites.run.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "jump":
        if (this.image !== this.sprites.jump.image) {
          this.image = this.sprites.jump.image;
          this.framesMax = this.sprites.jump.framesMax;
          this.framesCurrent = 0;
          break;
        }
      case "fall":
        if (this.image !== this.sprites.fall.image) {
          this.image = this.sprites.fall.image;
          this.framesMax = this.sprites.fall.framesMax;
          this.framesCurrent = 0;
          break;
        }
      case "attack1":
        if (this.image !== this.sprites.attack1.image) {
          this.image = this.sprites.attack1.image;
          this.framesMax = this.sprites.attack1.framesMax;
          this.framesCurrent = 0;
          break;
        }
      case "takeHit":
        if (this.image !== this.sprites.takeHit.image) {
          this.image = this.sprites.takeHit.image;
          this.framesMax = this.sprites.takeHit.framesMax;
          this.framesCurrent = 0;
          break;
        }
      case "death":
        if (this.image !== this.sprites.death.image) {
          this.image = this.sprites.death.image;
          this.framesMax = this.sprites.death.framesMax;
          this.framesCurrent = 0;
          break;
        }
      case "idleLeft":
        if (this.image !== this.sprites.idleLeft.image) {
          this.image = this.sprites.idleLeft.image;
          this.framesMax = this.sprites.idleLeft.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "runLeft":
        if (this.image !== this.sprites.runLeft.image) {
          this.image = this.sprites.runLeft.image;
          this.framesMax = this.sprites.runLeft.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "jumpLeft":
        if (this.image !== this.sprites.jumpLeft.image) {
          this.image = this.sprites.jumpLeft.image;
          this.framesMax = this.sprites.jumpLeft.framesMax;
          this.framesCurrent = 0;
          break;
        }
      case "fallLeft":
        if (this.image !== this.sprites.fallLeft.image) {
          this.image = this.sprites.fallLeft.image;
          this.framesMax = this.sprites.fallLeft.framesMax;
          this.framesCurrent = 0;
          break;
        }
      case "attack1Left":
        if (this.image !== this.sprites.attack1Left.image) {
          this.image = this.sprites.attack1Left.image;
          this.framesMax = this.sprites.attack1Left.framesMax;
          this.framesCurrent = 0;
          break;
        }
      case "takeHitLeft":
        if (this.image !== this.sprites.takeHitLeft.image) {
          this.image = this.sprites.takeHitLeft.image;
          this.framesMax = this.sprites.takeHitLeft.framesMax;
          this.framesCurrent = 0;
          break;
        }
      case "deathLeft":
        if (this.image !== this.sprites.deathLeft.image) {
          this.image = this.sprites.deathLeft.image;
          this.framesMax = this.sprites.deathLeft.framesMax;
          this.framesCurrent = 0;
          break;
        }
    }
  }
}
