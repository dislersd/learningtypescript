var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D | any;
// var asteroid_array: Array<Asteroid> = new Array<Asteroid>();
// var bullet_array: Array<Bullet> = new Array<Bullet>();
var space_ship: Ship;

function gameLoop() {
  requestAnimationFrame(gameLoop);
  ctx.fillStyle = "black";
  ctx.fillRect(0,0,900,600);
  let shape: iShape;
  for (let i: number = 0; i < shape_array.length; i++) {
  shape = shape_array[i];
  shape.draw();
  }

}

function keyboardInput (event: KeyboardEvent) {
  if (event.keyCode == 37) {
    space_ship.turnLeft();
  }
  else if (event.keyCode == 38) {
    space_ship.accelerate();
  }
  else if (event.keyCode == 39) {
    space_ship.turnRight();
  }
  else if (event.keyCode == 40) {
    space_ship.decelerate();
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

// ### VECTOR CLASS
class Vector {
  public x: number = 0;
  public y: number = 0;

  constructor(x:number, y: number) {
    this.x = x;
    this.y = y;
  }

  public magnitude = (): number => {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  public magSq = (): number => {
    return this.x * this.x + this.y * this.y;
  }
  public normalize = (magnitude: number = 1): Vector => {
    var len: number = Math.sqrt(this.x + this.y * this.y);
    this.x /= len;
    this.y /= len;
    return this;
  }
  public zero = (): void => {
    this.x = 0;
    this.y = 0;
  }
  public copy = (point: Vector): void => {
    this.x = point.x;
    this.y = point.y;
  }
  public rotate = (radians: number): void => {
    var cos: number = Math.cos(radians);
    var sin: number = Math.sin(radians);
    var x: number = (cos * this.x) + (sin * this.y);
    var y: number = (cos * this.y) + (sin * this.x);
    this.x = x;
    this.y = y;
  }
  public getAngle = (): number => {
    return Math.atan2(this.x, this.y);
  }
  public multiply = (value: number): void => {
    this.x *= value;
    this.y *= value;
  }
  public add = (value: Vector): void => {
    this.x += value.x;
    this.y += value.y;
  }
  public subtract = (value: Vector): void => {
    this.x -= value.x;
    this.y -= value.y;
  }
}

// ### ASTEROID CLASS
class Asteroid implements iShape {
  public x: number = 0;
  public y: number = 0;
  public lineWidth: number = 5;
  public color: string = 'white';
  public size: number = 20;
  public rotation: number = 0;
  public pointList: Array<Vector> = new Array<Vector>();

  public draw = (): void => {
    this.rotation += 0.02;
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;
    ctx.translate(this.x, this.y)
    ctx.rotate(this.rotation);

    ctx.moveTo(this.pointList[this.pointList.length - 1].x,this.pointList[this.pointList.length - 1].y);

    for (var i: number = 0; i < this.pointList.length; i++) {
      ctx.lineTo(this.pointList[i].x,this.pointList[i].y);
    }

    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

  constructor(x: number, y: number, size: number, color: string = 'white', line_width: number = 2) {
    this.x = x;
    this.y = y;
    this.size = size;

    this.pointList.push(new Vector(0, 3 * size));
    this.pointList.push(new Vector(-1 * size, 2 * size));
    this.pointList.push(new Vector(-3.5 * size, size));
    this.pointList.push(new Vector(-4 * size, 0));
    this.pointList.push(new Vector(2 * size, -4 * size));
    this.pointList.push(new Vector(3 * size, 1 * size));
    this.pointList.push(new Vector(4 * size, size));
    this.pointList.push(new Vector(size, 2 * size));

    this.color = color;
    this.lineWidth = line_width;
    
  }
}

// ### SPACE SHIP CLASS
class Ship implements iShape {
  public velocity: Vector = new Vector(0,0);
  public orientation: Vector = new Vector(1,0);
  public maxSpeedSQ: number = 100;
  private _maxSpeed: number = 10;
  public acceleration: number = 0.2;

  public x: number = 0;
  public y: number = 0;
  public lineWidth: number = 5;
  public color: string = 'white';
  public size: number = 20;
  public rotation: number = 0;
  public pointList: Array<Vector> = new Array<Vector>();

  private _tempVec: Vector = new Vector(0,0);

  public accelerate(): void {
    if(this.velocity.x == 0 && this.velocity.y == 0) {
      this.velocity.copy(this.orientation);
      this.velocity.multiply(this.acceleration);
    } 
    this._tempVec.copy(this.orientation);
    this._tempVec.multiply(this.acceleration);
    this.velocity.add(this._tempVec);
    if (this.velocity.magSq() >= this.maxSpeedSQ) {
      this.velocity.normalize(this.maxSpeed);
    }
  }

  public decelerate(): void {
    this.velocity.multiply(0.9);

    if (this.velocity.magSq() < 1) {
      this.velocity.x = 0;
      this.velocity.y = 0;
    }
  }
  
  get maxSpeed(): number {
    return Math.sqrt(this.maxSpeedSQ);
  }

  set maxSpeed(value: number) {
    this._maxSpeed = value;
    this.maxSpeedSQ = value * value;
  }
  
  public draw = (): void => {
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.beginPath();

    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;

    ctx.moveTo(this.pointList[this.pointList.length - 1].x, this.pointList[this.pointList.length - 1].y);

    for (var i: number = 0; i < this.pointList.length; i++) {
      ctx.lineTo(this.pointList[i].x, this.pointList[i].y);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

  public turnLeft = (): void => {
    this.rotation -= 0.1;
    if (this.rotation < 0) {
      this.rotation += Math.PI*2;
    }
    this.orientation.x = 1;
    this.orientation.y = 0;
    this.orientation.rotate(-this.rotation);
  }

  public turnRight = (): void => {
    this.rotation += 0.1;
    this.rotation %= Math.PI*2;
    this.orientation.x = 1;
    this.orientation.y = 0;
    this.orientation.rotate(-this.rotation);
  }

    constructor(x: number, y: number, size: number, color: string = 'white', line_width: number = 2) {
      this.x = x;
      this.y = y;
      this.size = size;

      this.pointList.push(new Vector(3 * size, 0));
      this.pointList.push(new Vector(-2 * size, -2 * size));
      this.pointList.push(new Vector(-1 * size, 0));
      this.pointList.push(new Vector(-2 * size, 2 * size));

      this.color = color;
      this.lineWidth = line_width;
  }
}


// ################################################ //

window.onload = () => {
  canvas = <HTMLCanvasElement>document.getElementById('cnvs');
  ctx = canvas.getContext("2d");

  space_ship = new Ship(200,450,8);

  shape_array.push(new Asteroid(700,500,20));
  shape_array.push(new Asteroid(100,560,10));
  shape_array.push(new Asteroid(500,200,20));
  shape_array.push(space_ship);

  document.addEventListener('keydown', keyboardInput);

  gameLoop();
}