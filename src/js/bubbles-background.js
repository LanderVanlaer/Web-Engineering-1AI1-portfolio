const canvas = document.getElementById('bubbles');
const ctx = canvas.getContext('2d');
const random = (min, max) => Math.floor(Math.random() * (max - min) + min);
class Bubble {
    static amount = 70;
    static connectLengthSquare = 60000;
    static drawConfig = {
        bubble: {
            color: '#195abd',
            width: 7
        },
        line: {
            color: '#3293e9',
            width: 1
        }
    };
    static maxSpeed = 4;
    x;
    y;
    directionX;
    directionY;
    speedX;
    speedY;
    constructor(canvas) {
        this.speedX = random(Bubble.maxSpeed * .1, Bubble.maxSpeed);
        this.speedY = random(Bubble.maxSpeed * .1, Bubble.maxSpeed);
        this.x = random(0, canvas.width);
        this.y = random(0, canvas.height);
        this.directionX = Math.random() < .5;
        this.directionY = Math.random() < .5;
    }
    get xMult() { return +this.directionX * 2 - 1; }
    ;
    get yMult() { return +this.directionY * 2 - 1; }
    ;
    connect(other, ctx) {
        if (((other.x - this.x) ** 2 + (other.y - this.y) ** 2) < Bubble.connectLengthSquare) {
            ctx.beginPath();
            ctx.lineWidth = Bubble.drawConfig.line.width;
            ctx.strokeStyle = Bubble.drawConfig.line.color;
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
        }
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = Bubble.drawConfig.bubble.color;
        ctx.arc(this.x, this.y, Bubble.drawConfig.bubble.width, 0, 2 * Math.PI);
        ctx.fill();
    }
    move(canvas) {
        this.x += this.xMult * this.speedX;
        this.y += this.yMult * this.speedY;
        if (this.x <= 0) {
            this.x = 0;
            this.directionX = !this.directionX;
        }
        else if (this.x >= canvas.width) {
            this.x = canvas.width;
            this.directionX = !this.directionX;
        }
        if (this.y <= 0) {
            this.y = 0;
            this.directionY = !this.directionY;
        }
        else if (this.y >= canvas.height) {
            this.y = canvas.height;
            this.directionY = !this.directionY;
        }
    }
}
const bubbles = [];
for (let i = 0; i < Bubble.amount; i++) {
    bubbles.push(new Bubble(canvas));
}
const bubblesRefresh = () => {
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
//# sourceMappingURL=bubbles-background.js.map