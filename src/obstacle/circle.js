var ObstacleCircle = Obstacle.extend({
    _vertCount: 20,
    _radius: 0,
    _thick: 0,
    _rotateDegree: 0,
    _speed: 3,
    ctor: function (radius, thick) {
        this._super();

        this._radius = radius;
        this._thick = thick;
    },
    onEnter: function () {
        this._super();

        this.addStar(cc.p(0, 0));
        this.addSwitch(this._radius + 110);
    },
    move: function () {
        this.clear();
        this._rotateDegree += this._speed;

        var degree = 360 / this._colors.length;
        for(var i = 0; i < this._colors.length; i++) {
            this.drawSector(this.center(), this._radius, this._thick, i * degree + this._rotateDegree, degree, this._colors[i]);
        }
    }
});