var ObstacleCross = Obstacle.extend({
    _vertCount: 10,
    _length: 0,
    _thick: 25,
    _autoAddShape: false,
    _speed: 1.5,
    ctor: function (length, thick) {
        this._super();

        this._length = length;
        if (thick !== undefined) {
            this._thick = thick;
        }
    },
    onEnter: function () {
        this._super();

        if (this._autoAddStar) {
            this.addStar(this._length + 50);
        }
        if (this._autoAddSwitch) {
            this.addSwitch(this._length + 150);
        }
    },
    getMaxHeight: function () {
        return this._length * 2;
    },
    move: function () {
        this._super();

        var degreeDefault = 360 / this._colors.length,
            radius = this._thick / 2,
            center = this.center(),
            origin = util.p2$v(center),
            px = radius / Math.tan(cc.degreesToRadians(degreeDefault / 2)),
            p1 = $V([px, radius]),
            p2 = $V([this._length, radius]),
            p3 = $V([this._length, -radius]),
            p4 = $V([px, -radius]),
            ps = [p1, p2, p3, p4],
            _oVerts = this.getSectorVerts(cc.p(this._length, 0), radius, radius, -90, 180),
            oVerts = [];
        _.forEach(_oVerts, function (pv, k) {
            oVerts.push(_.map(pv, util.p2$v));
        });

        for(var i = 0; i < this._colors.length; i++) {
            var degree = cc.degreesToRadians(i * degreeDefault + this._delta),
                _verts = _.concat([center], util.rotate$v2ps(ps, degree, origin)),
                verts = _.map(_verts, this.pAddDeltaY.bind(this)),
                color = this._colors[i];
            this.drawPoly(verts, color, 0, color);

            var shape = new cp.PolyShape(util.space.staticBody, util.cpVerts(verts), this.getPosition());
            this.addShape(shape, color);

            for (var j = 0; j < oVerts.length; j++) {
                _verts = util.rotate$v2ps(oVerts[j], degree, origin);
                verts = _.map(_verts, this.pAddDeltaY.bind(this));
                this.drawPoly(verts, color, 0, color);

                shape = new cp.PolyShape(util.space.staticBody, util.cpVerts(verts), this.getPosition());
                this.addShape(shape, color);
            }
        }
    }
});

ObstacleCross.create = function (args) {
    return new ObstacleCross(args.length, args.thick);
};