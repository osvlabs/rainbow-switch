var Obstacle = cc.DrawNode.extend({
    VERT_COUNT: 100,
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
            angleStep = cc.degreesToRadians(angleDegree) / this.VERT_COUNT,
            verts = [],
            vertsReversed = [];
        for (var i = 0; i <= this.VERT_COUNT; i++)
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
        verts = _.concat(verts, _.reverse(vertsReversed));
        this.drawPoly(verts, fillColor, 0, fillColor);
    },
    pass: function (point) {
        return true;
    }
});