var ObstacleGroup = Obstacle.extend({
    _a: null,
    _b: null,
    _starDeltaY: 0,
    _presetColor: null,

    ctor: function (a, b, starDeltaY) {
        this._super();

        this._a = a;
        this._b = b;
        if (starDeltaY !== undefined) {
            this._starDeltaY = starDeltaY;
        }
    },
    onEnter: function () {
        this._super();

        var colors = this._colors;
        this._presetColor = colors[0];

        this._a.setColors(colors, true);
        this.addChild(this._a);

        this._b.setColors([
            colors[3],
            colors[0],
            colors[2],
            colors[1]
        ], true);
        this.addChild(this._b);

        this.addStar(this._starDeltaY);
        this.addSwitch(this.getMaxHeight() + 40);
    },
    getMaxHeight: function () {
        return Math.max(this._a.getMaxHeight(), this._b.getMaxHeight());
    }
});

ObstacleGroup.create = function (args) {
    return new ObstacleGroup(args.a, args.b, args.starDeltaY);
};