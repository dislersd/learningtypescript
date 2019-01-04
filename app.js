var canvas;
var ctx;
function gameLoop() {
    requestAnimationFrame(gameLoop);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 1280, 720);
    var shape;
    for (var i = 0; i < shape_array.length; i++) {
        shape = shape_array[i];
        shape.draw();
        shape.x++;
    }
}
// ################################################ //
var shape_array = new Array();
var Rect = /** @class */ (function () {
    function Rect(x, y, width, height, color, line_width) {
        if (color === void 0) { color = 'blue'; }
        if (line_width === void 0) { line_width = 5; }
        var _this = this;
        this.x = 0;
        this.y = 0;
        this.lineWidth = 5;
        this.width = 0;
        this.height = 0;
        this.color = 'blue';
        this.draw = function () {
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = _this.color;
            ctx.lineWidth = _this.lineWidth;
            ctx.rect(_this.x, _this.y, _this.width, _this.height);
            ctx.stroke();
            ctx.restore();
        };
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.lineWidth = line_width;
    }
    return Rect;
}());
var Circle = /** @class */ (function () {
    function Circle(x, y, radius, color, line_width) {
        if (color === void 0) { color = 'red'; }
        if (line_width === void 0) { line_width = 2; }
        var _this = this;
        this.x = 0;
        this.y = 0;
        this.radius = 10;
        this.lineWidth = 2;
        this.color = 'red';
        this.draw = function () {
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = _this.color;
            ctx.lineWidth = _this.lineWidth;
            ctx.arc(_this.x, _this.y, _this.radius, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.restore();
        };
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.lineWidth = line_width;
    }
    return Circle;
}());
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = 0;
        this.y = 0;
        this.x = x;
        this.y = y;
    }
    return Point;
}());
var Asteroid = /** @class */ (function () {
    function Asteroid(x, y, size, color, line_width) {
        if (color === void 0) { color = 'white'; }
        if (line_width === void 0) { line_width = 2; }
        var _this = this;
        this.x = 0;
        this.y = 0;
        this.lineWidth = 5;
        this.color = 'white';
        this.size = 20;
        this.rotation = 0;
        this.pointList = new Array();
        this.draw = function () {
            _this.rotation += 0.02;
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = _this.color;
            ctx.lineWidth = _this.lineWidth;
            ctx.rotate(_this.rotation);
            ctx.moveTo(_this.x + _this.pointList[_this.pointList.length - 1].x, _this.y + _this.pointList[_this.pointList.length - 1].y);
            for (var i = 0; i < _this.pointList.length; i++) {
                ctx.lineTo(_this.x + _this.pointList[i].x, _this.y + _this.pointList[i].y);
            }
            ctx.closePath();
            ctx.stroke();
            ctx.restore();
        };
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
    return Asteroid;
}());
// ################################################ //
window.onload = function () {
    canvas = document.getElementById('cnvs');
    ctx = canvas.getContext("2d");
    shape_array.push(new Circle(500, 500, 50));
    shape_array.push(new Circle(70, 500, 20, '#fae'));
    shape_array.push(new Rect(200, 200, 200, 100, 'white'));
    shape_array.push(new Rect(700, 300, 200, 100, 'pink', 10));
    shape_array.push(new Asteroid(850, 600, 20));
    gameLoop();
};
