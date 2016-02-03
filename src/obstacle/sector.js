var ObstacleSector = Obstacle.extend({
    VERT_COUNT: 10,
    _rotateDegree: 0,
    _radius: 0,
    _thick: 0,
    _startDegree: 0,
    _degrees: 0,
    ctor: function (radius, thick, startDegree, degrees, rotateDegree) {
        this._super();

        this._rotateDegree = rotateDegree || this._rotateDegree;
        this._radius = radius;
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

        var n = this._colors.length,
            d = Math.floor((this._rotateDegree % this._degrees / this._degrees) * n),
            newColors = [],
            i = 0;
        for(; i < n; i++) {
            var j = (d + i) % n;
            newColors.push(this._colors[j]);
        }
        newColors.push(this._colors[d]);

        this.setContentSize(cc.size(this._radius * 2, this._radius * 2));
        var degreeDefault = this._degrees / n,
            delta = this._rotateDegree % degreeDefault;
        for(i = 0; i < n + 1; i++) {
            var start = this._startDegree + i * degreeDefault - delta,
                degree = degreeDefault;
            if (i == 0) {
                start += delta;
                degree -= delta;
            } else if (i == n) {
                degree -= degreeDefault - delta;
            }
            this.drawSector(this.center(), this._radius, this._thick, start, degree, newColors[i]);
        }
    }
});