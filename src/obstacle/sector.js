var ObstacleSector = Obstacle.extend({
    rotateDegree: 0,
    colors: [],
    radius: 0,
    thick: 0,
    startDegree: 0,
    degrees: 0,
    ctor: function (radius, thick, startDegree, degrees, colors, rotateDegree) {
        this._super();
        if (rotateDegree !== undefined) {
            this.rotateDegree = rotateDegree;
        }

        this.colors = colors || util.COLORS;
        this.radius = radius;
        this.thick = thick;
        this.startDegree = startDegree;
        this.degrees = degrees;

        this.schedule(this.rotate.bind(this), 0.5);
    },
    rotate: function () {
        this.clear();

        this.rotateDegree++;

        var n = this.colors.length,
            d = Math.round((this.rotateDegree % this.degrees / this.degrees) * n),
            newColors = [],
            i = 0;
        for(; i < n; i++) {
            var j = (d + i) % n;
            newColors.push(this.colors[j]);
        }
        newColors.push(this.colors[d]);
        util.logColors(newColors);

        this.setContentSize(cc.size(this.radius * 2, this.radius * 2));
        var degreeDefault = this.degrees / n,
            delta = this.rotateDegree % degreeDefault;
        for(i = 0; i < n + 1; i++) {
            var start = this.startDegree + i * degreeDefault - delta,
                degree = degreeDefault;
            if (i == 0) {
                start += delta;
                degree -= delta;
            } else if (i == n) {
                degree -= degreeDefault - delta;
            }
            this.drawSector(this.center(), this.radius, this.thick, start, degree, newColors[i]);
        }
    }
});