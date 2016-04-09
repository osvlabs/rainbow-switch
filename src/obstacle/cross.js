var ObstacleCross = Obstacle.extend({
    _vertCount: 10,
    _radius: 0,
    _thick: 25,
    _autoAddShape: false,
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
            this.addStar(this._radius + 50);
        }
        if (this._autoAddSwitch) {
            this.addSwitch(this._radius + 150);
        }
    },
    getMaxHeight: function () {
        return this._radius * 2;
    },
    move: function () {
        this._super();

        var degreeDefault = 360 / this._colors.length,
            radius = this._thick / 2,
            center = this.center(),
            origin = util.p2$v(center),
            px = radius / Math.tan(cc.degreesToRadians(degreeDefault / 2)),
            p1 = $V([px, radius]),
            p2 = $V([this._radius, radius]),
            p3 = $V([this._radius, -radius]),
            p4 = $V([px, -radius]),
            pe = $V([this._radius, 0]),
            ps = [p1, p2, p3, p4],
            pl = this.getLayerPosition();

        for(var i = 0; i < this._colors.length; i++) {
            var degree = cc.degreesToRadians(i * degreeDefault + this._delta),
                _verts = _.concat([center], util.rotate$v2ps(ps, degree, origin)),
                verts = _.map(_verts, this.pAddDeltaY.bind(this)),
                color = this._colors[i];
            this.drawPoly(verts, color, 0, color);

            var shape = new cp.PolyShape(util.space.staticBody, util.cpVerts(verts), pl);
            this.addShape(shape, color);

            var peNew = this.pAddDeltaY(util.$v2p(pe.rotate(degree, origin)));
            this.drawDot(peNew, radius, color);

            var offset = cc.pAdd(peNew, pl);
            shape = new cp.CircleShape(util.space.staticBody, radius, offset);
            this.addShape(shape, color);
        }
    }
});

ObstacleCross.create = function (args) {
    return new ObstacleCross(args.radius, args.thick);
};

ObstacleCross.args = function () {
    var radius = _.random(90, 180),
        thick = _.random(10, 60);
    return {
        type: 'Cross',
        radius: radius,
        thick: thick,
        shake: _.sample([
            0,
            _.random(20, 90)
        ])
    };
};