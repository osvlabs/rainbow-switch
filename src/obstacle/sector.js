var ObstacleSector = Obstacle.extend({
    VERT_COUNT: 15,
    _rotateDegree: 0,
    _radius: 0,
    _thick: 0,
    _startDegree: 0,
    _degrees: 0,
    ctor: function (radius, thick, startDegree, degrees, rotateDegree) {
        this._super();

        this._rotateDegree = rotateDegree || this._rotateDegree;
        this._radius = radius;
        this._degrees = degrees;
        this._thick = thick;
        this._startDegree = startDegree;
    },
    onEnter: function () {
        this._super();

        this.scheduleUpdate();
    },
    update: function (dt) {
        this._super(dt);

        this.clear();
        this._rotateDegree += this._speed;

        if (this._rotateDegree >= 0) {
            this.updateClockwise();
        } else {
            this.updateCounterclockwise();
        }
    },
    updateClockwise: function () {
        var n = this._colors.length,
            newColors = [],
            i = 0,
            d = Math.floor((this._rotateDegree % this._degrees / this._degrees) * n);
        for(; i < n; i++) {
            var j = (d + i) % n;
            newColors.push(this._colors[j]);
        }
        newColors.push(this._colors[d]);

        var defaultDegree = this._degrees / n,
            delta = this._rotateDegree % defaultDegree;
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
    updateCounterclockwise: function () {
        var n = this._colors.length,
            newColors = [],
            i = 0,
            d = Math.floor((Math.abs(this._rotateDegree) % this._degrees / this._degrees) * n);
        for(i = n - 1; i >= 0; i--) {
            var j = (d + 1 + i) % n;
            newColors.push(this._colors[j]);
        }
        newColors.push(this._colors[d]);

        var defaultDegree = this._degrees / n,
            delta = Math.abs(this._rotateDegree % defaultDegree);
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