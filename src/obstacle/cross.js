var ObstacleCross = Obstacle.extend({
    _length: 0,
    _thick: 25,
    ctor: function (length, thick) {
        this._super();

        this._length = length;
        if (thick !== undefined) {
            this._thick = thick;
        }

        //this.addStar(cc.p(0, 0));
        //this.addSwitch(this._length + 110);
    },
    getMaxHeight: function () {
        return this._length * 2;
    },
    move: function () {
        this.clear();
        this._delta += this._speed;

        var degreeDefault = 360 / this._colors.length,
            origin = this.center(),
            radius = this._thick / 2;
        for(var i = 0; i < this._colors.length; i++) {
            var degree = cc.degreesToRadians(i * degreeDefault + this._delta),
                sin = Math.sin(degree),
                cos = Math.cos(degree),
                tan = Math.tan(degree),
                rsin = radius * sin,
                rcos = radius * cos,
                p1 = cc.p(
                    -rsin,
                    rcos
                ),
                p2l = (this._length + radius * tan),
                p2m = radius / sin,
                p2 = cc.p(
                    p2l * cos - p2m,
                    p2l * sin
                ),
                p3l = p2l + this._thick * tan,
                p3 = cc.p(
                    p3l * cos - p2m,
                    p3l * sin - this._thick / cos
                ),
                p4 = cc.p(
                    rsin,
                    -rcos
                ),
                verts = [p1, p2, p3, p4],
                color = this._colors[i];
            this.drawPoly(verts, color, 0, color);
        }
    }
});

ObstacleCross.create = function (args) {
    return new ObstacleCross(args.length, args.thick);
};