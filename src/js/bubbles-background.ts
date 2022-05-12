const canvas: HTMLCanvasElement = document.getElementById('bubbles') as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
const random = (min: number, max: number) => Math.floor(Math.random() * (max - min) + min);

class Bubble {
  public static amount = 70;
  public static connectLengthSquare = 60000;
  public static drawConfig: { bubble: { width: number, color: string }, line: { width: number, color: string } } = {
    bubble: {
      color: '#195abd',
      width: 7
    },
    line: {
      color: '#3293e9',
      width: 1
    }
  };
  public static maxSpeed = 4;
  public x: number;
  public y: number;
  public directionX: boolean;
  public directionY: boolean;
  public speedX: number;
  public speedY: number;

  constructor(canvas: HTMLCanvasElement) {
    this.speedX = random(Bubble.maxSpeed * .1, Bubble.maxSpeed);
    this.speedY = random(Bubble.maxSpeed * .1, Bubble.maxSpeed);

    this.x = random(0, canvas.width);
    this.y = random(0, canvas.height);
    this.directionX = Math.random() < .5;
    this.directionY = Math.random() < .5;
  }

  get xMult(): number {return +this.directionX * 2 - 1;};

  get yMult(): number {return +this.directionY * 2 - 1;};

  connect(other: Bubble, ctx: CanvasRenderingContext2D): void {
    if (((other.x - this.x) ** 2 + (other.y - this.y) ** 2) < Bubble.connectLengthSquare) {
      ctx.beginPath();
      ctx.lineWidth = Bubble.drawConfig.line.width;
      ctx.strokeStyle = Bubble.drawConfig.line.color;
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(other.x, other.y);
      ctx.stroke();
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.fillStyle = Bubble.drawConfig.bubble.color;
    ctx.arc(this.x, this.y, Bubble.drawConfig.bubble.width, 0, 2 * Math.PI);
    ctx.fill();
  }

  move(canvas: HTMLCanvasElement): void {
    this.x += this.xMult * this.speedX;
    this.y += this.yMult * this.speedY;

    if (this.x <= 0) {
      this.x = 0;
      this.directionX = !this.directionX;
    } else if (this.x >= canvas.width) {
      this.x = canvas.width;
      this.directionX = !this.directionX;
    }
    if (this.y <= 0) {
      this.y = 0;
      this.directionY = !this.directionY;
    } else if (this.y >= canvas.height) {
      this.y = canvas.height;
      this.directionY = !this.directionY;
    }
  }

}

const bubbles: Bubble[] = [];
for (let i = 0; i < Bubble.amount; i++) {
  bubbles.push(new Bubble(canvas));
}

const bubblesRefresh = (): void => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  bubbles.forEach((bubble, i) => {
    bubble.move(canvas);
    for (let j = i + 1; j < bubbles.length; ++j) {
      bubble.connect(bubbles[j], ctx);
    }
    bubble.draw(ctx);
  });

  requestAnimationFrame(bubblesRefresh);
};

bubblesRefresh();
