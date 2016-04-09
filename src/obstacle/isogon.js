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

ObstacleIsogon.args = function () {
    return {
        type: 'Isogon',
        radius: _.random(90, 180),
        thick: _.random(10, 60),
        shake: _.sample([
            0,
            _.random(20, 90)
        ])
    };
};