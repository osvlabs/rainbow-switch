var ObstacleIsogon = ObstacleCircle.extend({
    _vertCount: 2,
    ctor: function (radius, thick, colors) {
        this._super(radius, thick);

        if (colors === undefined) {
            colors = 4;
        }
        this.setColors(colors);
    }
});

ObstacleIsogon.create = function (args) {
    return new ObstacleIsogon(args.radius, args.thick, args.colors);
};