var ObstacleCircle = Obstacle.extend({
    ctor: function (radius, thick, colors) {
        this._super();

        if (colors == undefined) {
            colors = util.COLORS;
        }

        this.setContentSize(cc.size(radius * 2, radius * 2));
        var degree = 360 / colors.length;
        for(var i = 0; i < colors.length; i++) {
            this.drawSector(this.center(), radius, thick, i * degree, degree, colors[i]);
        }
    },
    pass: function (point) {
        point = this.convertToNodeSpace(point);
    }
});