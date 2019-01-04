var canvas;
var ctx;
// var asteroid_array: Array<Asteroid> = new Array<Asteroid>();
// var bullet_array: Array<Bullet> = new Array<Bullet>();
var space_ship;
function gameLoop() {
    requestAnimationFrame(gameLoop);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 900, 600);
    var shape;
    for (var i = 0; i < shape_array.length; i++) {
        shape = shape_array[i];
        shape.draw();
    }
}
function keyboardInput(event) {
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
var shape_array = new Array();
// ### VECTOR CLASS
var Vector = /** @class */ (function () {
    function Vector(x, y) {
        var _this = this;
        this.x = 0;
        this.y = 0;
        this.magnitude = function () {
            return Math.sqrt(_this.x * _this.x + _this.y * _this.y);
        };
        this.magSq = function () {
            return _this.x * _this.x + _this.y * _this.y;
        };
        this.normalize = function (magnitude) {
            if (magnitude === void 0) { magnitude = 1; }
            var len = Math.sqrt(_this.x + _this.y * _this.y);
            _this.x /= len;
            _this.y /= len;
            return _this;
        };
        this.zero = function () {
            _this.x = 0;
            _this.y = 0;
        };
        this.copy = function (point) {
            _this.x = point.x;
            _this.y = point.y;
        };
        this.rotate = function (radians) {
            var cos = Math.cos(radians);
            var sin = Math.sin(radians);
            var x = (cos * _this.x) + (sin * _this.y);
            var y = (cos * _this.y) + (sin * _this.x);
            _this.x = x;
            _this.y = y;
        };
        this.getAngle = function () {
            return Math.atan2(_this.x, _this.y);
        };
        this.multiply = function (value) {
            _this.x *= value;
            _this.y *= value;
        };
        this.add = function (value) {
            _this.x += value.x;
            _this.y += value.y;
        };
        this.subtract = function (value) {
            _this.x -= value.x;
            _this.y -= value.y;
        };
        this.x = x;
        this.y = y;
    }
    return Vector;
}());
// ### ASTEROID CLASS
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
            ctx.translate(_this.x, _this.y);
            ctx.rotate(_this.rotation);
            ctx.moveTo(_this.pointList[_this.pointList.length - 1].x, _this.pointList[_this.pointList.length - 1].y);
            for (var i = 0; i < _this.pointList.length; i++) {
                ctx.lineTo(_this.pointList[i].x, _this.pointList[i].y);
            }
            ctx.closePath();
            ctx.stroke();
            ctx.restore();
        };
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
    return Asteroid;
}());
// ### SPACE SHIP CLASS
var Ship = /** @class */ (function () {
    function Ship(x, y, size, color, line_width) {
        if (color === void 0) { color = 'white'; }
        if (line_width === void 0) { line_width = 2; }
        var _this = this;
        this.velocity = new Vector(0, 0);
        this.orientation = new Vector(1, 0);
        this.maxSpeedSQ = 100;
        this._maxSpeed = 10;
        this.acceleration = 0.2;
        this.x = 0;
        this.y = 0;
        this.lineWidth = 5;
        this.color = 'white';
        this.size = 20;
        this.rotation = 0;
        this.pointList = new Array();
        this._tempVec = new Vector(0, 0);
        this.draw = function () {
            _this.x += _this.velocity.x;
            _this.y += _this.velocity.y;
            ctx.save();
            ctx.translate(_this.x, _this.y);
            ctx.rotate(_this.rotation);
            ctx.beginPath();
            ctx.strokeStyle = _this.color;
            ctx.lineWidth = _this.lineWidth;
            ctx.moveTo(_this.pointList[_this.pointList.length - 1].x, _this.pointList[_this.pointList.length - 1].y);
            for (var i = 0; i < _this.pointList.length; i++) {
                ctx.lineTo(_this.pointList[i].x, _this.pointList[i].y);
            }
            ctx.closePath();
            ctx.stroke();
            ctx.restore();
        };
        this.turnLeft = function () {
            _this.rotation -= 0.1;
            if (_this.rotation < 0) {
                _this.rotation += Math.PI * 2;
            }
            _this.orientation.x = 1;
            _this.orientation.y = 0;
            _this.orientation.rotate(-_this.rotation);
        };
        this.turnRight = function () {
            _this.rotation += 0.1;
            _this.rotation %= Math.PI * 2;
            _this.orientation.x = 1;
            _this.orientation.y = 0;
            _this.orientation.rotate(-_this.rotation);
        };
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
    Ship.prototype.accelerate = function () {
        if (this.velocity.x == 0 && this.velocity.y == 0) {
            this.velocity.copy(this.orientation);
            this.velocity.multiply(this.acceleration);
        }
        this._tempVec.copy(this.orientation);
        this._tempVec.multiply(this.acceleration);
        this.velocity.add(this._tempVec);
        if (this.velocity.magSq() >= this.maxSpeedSQ) {
            this.velocity.normalize(this.maxSpeed);
        }
    };
    Ship.prototype.decelerate = function () {
        this.velocity.multiply(0.9);
        if (this.velocity.magSq() < 1) {
            this.velocity.x = 0;
            this.velocity.y = 0;
        }
    };
    Object.defineProperty(Ship.prototype, "maxSpeed", {
        get: function () {
            return Math.sqrt(this.maxSpeedSQ);
        },
        set: function (value) {
            this._maxSpeed = value;
            this.maxSpeedSQ = value * value;
        },
        enumerable: true,
        configurable: true
    });
    return Ship;
}());
// ################################################ //
window.onload = function () {
    canvas = document.getElementById('cnvs');
    ctx = canvas.getContext("2d");
    space_ship = new Ship(200, 450, 8);
    shape_array.push(new Asteroid(700, 500, 20));
    shape_array.push(new Asteroid(100, 560, 10));
    shape_array.push(new Asteroid(500, 200, 20));
    shape_array.push(space_ship);
    document.addEventListener('keydown', keyboardInput);
    gameLoop();
};
