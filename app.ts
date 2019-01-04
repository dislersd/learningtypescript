var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D | any;

function gameLoop() {
  requestAnimationFrame(gameLoop);
  ctx.fillStyle = "black";
  ctx.fillRect(0,0,1280,720);

  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle = "red";
  ctx.lineWidth = 5;
  ctx.arc(400,400,100,0,2*Math.PI);
  ctx.stroke();
  ctx.restore();
}

window.onload = () => {
  canvas = <HTMLCanvasElement>document.getElementById('cnvs');
  ctx = canvas.getContext("2d");
  gameLoop();
}