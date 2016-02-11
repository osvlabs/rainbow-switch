var ObstacleCross = Obstacle.extend({
    _length: 0,
    _thick: 25,
    ctor: function (length, thick) {
        this._super();

        this._length = length;
        if (thick !== undefined) {
            this._thick = thick;
        }

        this.addStar(cc.p(0, this._length + 50));
        this.addSwitch(this._length + 150);
    },
    getMaxHeight: function () {
        return this._length * 2;
    },
    move: function () {
        this.clear();
        this._delta += this._speed;

        var degreeDefault = 360 / this._colors.length,
            radius = this._thick / 2,
            origin = util.p2$v(this.center()),
            p1 = $V([0, radius]),
            p2 = $V([this._length, radius]),
            p3 = $V([this._length, -radius]),
            p4 = $V([0, -radius]);
        for(var i = 0; i < this._colors.length; i++) {
            var degree = cc.degreesToRadians(i * degreeDefault + this._delta),
                verts = [
                    util.$v2p(p1.rotate(degree, origin)),
                    util.$v2p(p2.rotate(degree, origin)),
                    util.$v2p(p3.rotate(degree, origin)),
                    util.$v2p(p4.rotate(degree, origin))
                ],
                color = this._colors[i];
            this.drawPoly(verts, color, 0, color);

            var shape = new cp.PolyShape(util.space.staticBody, util.cpVerts(verts), this.getPosition());
            shape.setSensor(true);
            shape.setCollisionType(util.COLLISION_OBSTACLE);
            shape.color = color;
            shape.obstacle = this;
            util.space.addShape(shape);
            this._shapes.push(shape);
        }
    }
});

ObstacleCross.create = function (args) {
    return new ObstacleCross(args.length, args.thick);
};