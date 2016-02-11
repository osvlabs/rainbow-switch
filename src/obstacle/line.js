var ObstacleLine = Obstacle.extend({
    _vertCount: 2,
    _thick: 25,
    _length: 0,
    ctor: function (thick) {
        this._super();
        this._length = cc.winSize.width;

        if (thick !== undefined) {
            this._thick = thick;
        }

        this.addStar(cc.p(0, this._radius + 55));
        this.addSwitch(this._radius + 150);
    },
    getMaxHeight: function () {
        return this._thick;
    },
    move: function () {
        this.clear();
        this._delta += this._speed;

        if (this._delta >= 0) {
            this.moveRight();
        } else {
            this.moveLeft();
        }
    },
    moveRight: function () {
        var n = this._colors.length,
            newColors = [],
            i = 0,
            d = Math.floor((this._delta % this._length / this._length) * n);
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
            this.drawSector(this.center(), this._radius, this._thick, start, degree, newColors[i]);
        }
    },
    moveLeft: function () {
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
            this.drawSector(this.center(), this._radius, this._thick, start, Math.abs(degree), newColors[i]);
        }
    }
});

ObstacleLine.create = function (args) {
    return new ObstacleLine(args.thick);
};