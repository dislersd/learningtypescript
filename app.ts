var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D | any;

function gameLoop() {
  requestAnimationFrame(gameLoop);
  ctx.fillStyle = "black";
  ctx.fillRect(0,0,1280,720);
  let shape: iShape;
  for (let i: number = 0; i < shape_array.length; i++) {
  shape = shape_array[i];
  shape.draw();
  shape.x++
  }

}

// ################################################ //

let shape_array: Array<iShape> = new Array<iShape>();

interface iShape {
  draw(): void;
  x: number;
  y: number;
  color: string;
  lineWidth: number;
}

class Rect implements iShape {
  public x: number = 0;
  public y: number = 0;
  public lineWidth: number = 5;
  public width: number = 0;
  public height: number = 0;
  public color: string = 'blue';

  constructor(x: number, y: number, width: number, height: number, color: string = 'blue', line_width: number = 5) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.lineWidth = line_width;
  }
  public draw = (): void => {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
    ctx.restore();
  }
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

class Point {
  public x: number = 0;
  public y: number = 0;

  constructor(x:number, y: number) {
    this.x = x;
    this.y = y;
  }
}

class Asteroid implements iShape {
  public x: number = 0;
  public y: number = 0;
  public lineWidth: number = 5;
  public color: string = 'white';
  public size: number = 20;
  public rotation: number = 0;
  public pointList: Array<Point> = new Array<Point>();

  public draw = (): void => {
    this.rotation += 0.02;
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;
    ctx.rotate(this.rotation);

    ctx.moveTo(this.x + this.pointList[this.pointList.length - 1].x, this.y + this.pointList[this.pointList.length - 1].y);

    for (var i: number = 0; i < this.pointList.length; i++) {
      ctx.lineTo(this.x + this.pointList[i].x, this.y + this.pointList[i].y);
    }

    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

  constructor(x: number, y: number, size: number, color: string = 'white', line_width: number = 2) {
    this.x = x;
    this.y = y;
    this.size = size;

    this.pointList.push(new Point(0, 3 * size));
    this.pointList.push(new Point(-1 * size, 2 * size));
    this.pointList.push(new Point(-3.5 * size, size));
    this.pointList.push(new Point(-3 * size, size));
    this.pointList.push(new Point(-4 * size, 0));
    this.pointList.push(new Point(2 * size, -4 * size));
    this.pointList.push(new Point(3 * size, 1 * size));
    this.pointList.push(new Point(4 * size, size));
    this.pointList.push(new Point(size, 2 * size));

    this.color = color;
    this.lineWidth = line_width;
    
  }
}


// ################################################ //

window.onload = () => {
  canvas = <HTMLCanvasElement>document.getElementById('cnvs');
  ctx = canvas.getContext("2d");

  shape_array.push(new Circle(500,500,50));
  shape_array.push(new Circle(70,500,20, '#fae'));
  shape_array.push(new Rect(200,200,200,100,'white'));
  shape_array.push(new Rect(700,300,200,100,'pink', 10));
  shape_array.push(new Asteroid(850,600,20));

  gameLoop();
}