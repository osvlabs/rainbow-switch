var Obstacle = cc.DrawNode.extend({
    ctor: function () {
        this._super();
        this.setAnchorPoint(0.5, 0.5);
    },
    center: function () {
        var size = this.getContentSize();
        return cc.p(size.width / 2, size.height / 2);
    },
    drawSector: function (origin, radius, start_degree, angle_degree, fillColor) {
        var num_of_points = 100,
            angle_step = 2 * Math.PI * angle_degree / 360 / num_of_points,
            verts = [
                origin
            ];
        for (var i = 0; i <= num_of_points; i++)
        {
            var rads = angle_step * i;
            var x = origin.x + radius * Math.cos(rads);
            var y = origin.y + radius * Math.sin(rads);
            verts.push(cc.p(x, y));
        }
        this.drawPoly(verts, fillColor);
    }
});