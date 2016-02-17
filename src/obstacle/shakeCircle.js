var ObstacleShakeCircle = ObstacleCircle.extend({
    _shake: 40,
    _shakeSpeed: 2,
    _currentShakeSpeed: 0,
    _deltaY: 0,
    ctor: function (radius, thick, shake, shakeSpeed) {
        this._super();

        this._radius = radius;
        if (thick !== undefined) {
            this._thick = thick;
        }
        if (shake !== undefined) {
            this._shake = shake;
        }
        if (shakeSpeed !== undefined) {
            this._shakeSpeed = Math.abs(shakeSpeed);
        }
        this._currentShakeSpeed = this._shakeSpeed;
    },
    getMaxHeight: function () {
        return (this._radius + this._shake) * 2;
    },
    move: function () {
        this.clear();
        this._delta += this._speed;

        var nextShake = this._deltaY + this._shakeSpeed;
        if (nextShake > this._shake) {
            this._currentShakeSpeed = -this._shakeSpeed;
        } else if (nextShake < -this._shake) {
            this._currentShakeSpeed = this._shakeSpeed;
        }
        this._deltaY += this._currentShakeSpeed;

        var degree = 360 / this._colors.length,
            center = this.center(),
            origin = cc.p(center.x, center.y + this._deltaY);
        for(var i = 0; i < this._colors.length; i++) {
            this.drawSector(origin, this._radius, this._thick, i * degree + this._delta, degree, this._colors[i]);
        }
    }
});

ObstacleShakeCircle.create = function (args) {
    return new ObstacleShakeCircle(args.radius, args.thick, args.shake, args.shakeSpeed);
};