var Obstacle = cc.DrawNode.extend({
    VERT_COUNT: 50,
    shapes: [],
    ctor: function () {
        this._super();
        this.setAnchorPoint(0.5, 0.5);
    },
    center: function () {
        var size = this.getContentSize();
        return cc.p(size.width / 2, size.height / 2);
    },
    drawSector: function (origin, radius, thick, startDegree, angleDegree, fillColor) {
        var angleStart = cc.degreesToRadians(startDegree),
            angleStep = cc.degreesToRadians(angleDegree) / (this.VERT_COUNT - 1),
            verts = [],
            vertsReversed = [];
        for (var i = 0; i < this.VERT_COUNT; i++)
        {
            var rads = angleStart + angleStep * i,
                cos = Math.cos(rads),
                sin = Math.sin(rads),
                x = origin.x + radius * cos,
                y = origin.y + radius * sin;
            verts.push(cc.p(x, y));

            x -= thick * cos;
            y -= thick * sin;
            vertsReversed.push(cc.p(x, y));
        }
        vertsReversed = _.reverse(vertsReversed);
        var vertsAll = _.concat(verts, vertsReversed);
        this.drawPoly(vertsAll, fillColor, 0, fillColor);

        for (i = 0; i < this.VERT_COUNT - 1; i++) {
            var p1 = vertsReversed[i],
                p2 = vertsReversed[i + 1],
                p3 = verts[this.VERT_COUNT - 2 - i],
                p4 = verts[this.VERT_COUNT - 1 - i],
                cpVerts = util.cpVerts([p4, p3, p2, p1]);

            var shape = new cp.PolyShape(util.space.staticBody, cpVerts, cc.pSub(this.getPosition(), this.center()));
            shape.setSensor(true);
            shape.setCollisionType(util.COLLISION_OBSTACLE);
            util.space.addShape(shape);
            this.shapes.push(shape);
        }
    }
});