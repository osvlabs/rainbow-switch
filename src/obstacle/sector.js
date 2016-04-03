var ObstacleSector = ObstacleCircle.extend({
    _vertCount: 15,
    _centerShapeDeltaY: 0,
    _startDegree: 60,
    _degrees: 60,
    _speed: 0,
    ctor: function (radius, thick, startDegree, degrees, delta) {
        Obstacle.prototype.ctor.apply(this);

        this._radius = radius;
        if (thick !== undefined) {
            this._thick = thick;
        }
        if (startDegree !== undefined) {
            this._startDegree = startDegree;
        }
        if (degrees !== undefined) {
            this._degrees = degrees;
        }
        this._delta = delta || this._delta;
        this._centerShapeDeltaY = radius - this.getMaxHeight() / 2;
    },
    onEnter: function () {
        Obstacle.prototype.onEnter.apply(this);

        if (this._autoAddStar) {
            this.addStar(this._radius + 55);
        }
        if (this._autoAddSwitch) {
            this.addSwitch(this._radius + 150);
        }
    },
    getMaxHeight: function () {
        var ys = [];
        for(var i = this._startDegree; i <= this._startDegree + this._degrees; i++) {
            ys.push(Math.sin(cc.degreesToRadians(i)));
        }
        return this._radius * (_.max(ys) - _.min(ys)) + 60;
    },
    move: function () {
        Obstacle.prototype.move.apply(this, arguments);

        if (this._delta >= 0) {
            this.moveClockwise();
        } else {
            this.moveCounterclockwise();
        }
    },
    moveClockwise: function () {
        var n = this._colors.length,
            newColors = [],
            i = 0,
            d = Math.floor((this._delta % this._degrees / this._degrees) * n);
        for(; i < n; i++) {
            var j = (d + i) % n;
            newColors.push(this._colors[j]);
        }
        newColors.push(this._colors[d]);

        var defaultDegree = this._degrees / n,
            delta = this._delta % defaultDegree;
        for(i = 0; i < n + 1; i++) {
            var start = this._startDegree + i * defaultDegree - delta,
                degree = defaultDegree;
            if (i == 0) {
                start += delta;
                degree -= delta;
            } else if (i == n) {
                degree = delta % defaultDegree;
            }
            this.drawOperate({
                start: start,
                degree: degree,
                color: newColors[i]
            });
        }
    },
    moveCounterclockwise: function () {
        var n = this._colors.length,
            newColors = [],
            i = 0,
            d = Math.floor((Math.abs(this._delta) % this._degrees / this._degrees) * n);
        for(i = n - 1; i >= 0; i--) {
            var j = (d + 1 + i) % n;
            newColors.push(this._colors[j]);
        }
        newColors.push(this._colors[d]);

        var defaultDegree = this._degrees / n,
            delta = Math.abs(this._delta % defaultDegree);
        for(i = 0; i < n + 1; i++) {
            var start = this._startDegree + (i - 1) * defaultDegree + delta,
                degree = defaultDegree;
            if (i == 0) {
                start = start + defaultDegree - delta;
                degree = delta;
            } else if (i == n) {
                degree = defaultDegree - delta;
            }
            this.drawOperate({
                start: start,
                degree: degree,
                color: newColors[i]
            });
        }
    },
    drawOperate: function (args) {
        this.drawSector(
            this.getShakedCenter(), this._radius, this._thick, args.start, Math.abs(args.degree), args.color
        );
    }
});

ObstacleSector.create = function (args) {
    return new ObstacleSector(args.radius, args.thick, args.startDegree, args.degrees, args.delta);
};