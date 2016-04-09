var ObstacleCircle = Obstacle.extend({
    _vertCount: 20,
    _radius: 0,
    _thick: 25,
    _speed: 0,
    ctor: function (radius, thick) {
        this._super();

        this._radius = radius;
        if (thick !== undefined) {
            this._thick = thick;
        }
    },
    onEnter: function () {
        this._super();

        if (this._autoAddStar) {
            this.addStar(0);
        }
        if (this._autoAddSwitch) {
            this.addSwitch(this._radius + 110);
        }
    },
    getMaxHeight: function () {
        return (this._radius + this._shake) * 2;
    },
    move: function () {
        this._super();

        var degree = 360 / this._colors.length,
            origin = this.getShakedCenter();
        for(var i = 0; i < this._colors.length; i++) {
            this.drawSector(origin, this._radius, this._thick, i * degree + this._delta, degree, this._colors[i]);
        }
    }
});

ObstacleCircle.create = function (args) {
    return new ObstacleCircle(args.radius, args.thick);
};

ObstacleCircle.args = function () {
    var radius = _.random(90, 180),
        thick = _.random(10, radius);
    return {
        type: 'Circle',
        radius: radius,
        thick: thick,
        shake: _.sample([
            0,
            _.random(20, 150)
        ])
    };
};