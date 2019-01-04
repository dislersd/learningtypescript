var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D | any;

function gameLoop() {
  requestAnimationFrame(gameLoop);
  ctx.fillStyle = "black";
  ctx.fillRect(0,0,1280,720);

  myCircle.draw();
  myCircle2.draw();
}

class Circle {
  public x: number = 0;
  public y: number = 0;
  public radius: number = 10;
  public lineWidth: number = 2;
  public color: string = 'red';
  constructor(x: number, y: number, radius: number, color: string = 'red', line_width: number = 2) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.lineWidth = line_width;
  }
  public draw = (): void => {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore();
  }
}

const myCircle: Circle = new Circle(50,75,25);
const myCircle2: Circle = new Circle(200,500,50,'blue');

window.onload = () => {
  canvas = <HTMLCanvasElement>document.getElementById('cnvs');
  ctx = canvas.getContext("2d");
  gameLoop();
}