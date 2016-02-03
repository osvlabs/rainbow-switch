var ObstacleCircle = Obstacle.extend({
    VERT_COUNT: 5,
    _colors: [],
    _radius: 0,
    _thick: 0,
    ctor: function (radius, thick, colors) {
        this._super();

        this._colors = colors || util.COLORS;
        this._radius = radius;
        this._thick = thick;
    },
    onEnter: function () {
        this._super();

        this.setContentSize(cc.size(this._radius * 2, this._radius * 2));
        var degree = 360 / this._colors.length;
        for(var i = 0; i < this._colors.length; i++) {
            this.drawSector(this.center(), this._radius, this._thick, i * degree, degree, this._colors[i]);
        }
    }
});