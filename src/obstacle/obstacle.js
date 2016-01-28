var Obstacle = cc.DrawNode.extend({
    ctor: function () {
        this._super();
        this.setAnchorPoint(0.5, 0.5);
    },
    center: function () {
        var size = this.getContentSize();
        return cc.p(size.width / 2, size.height / 2);
    },
    drawSector: function (origin, radius, thick, start_degree, angle_degree, fillColor) {
        var num_of_points = 100,
            angle_start = cc.degreesToRadians(start_degree),
            angle_step = cc.degreesToRadians(angle_degree) / num_of_points,
            verts = [],
            vertsReversed = [];
        for (var i = 0; i <= num_of_points; i++)
        {
            var rads = angle_start + angle_step * i,
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
    }
});