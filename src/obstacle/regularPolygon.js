var ObstacleRegularPolygon = ObstacleCircle.extend({
    _vertCount: 2,
    ctor: function (radius, thick, colors) {
        this._super(radius, thick);
        this.setColors(colors);
    }
});