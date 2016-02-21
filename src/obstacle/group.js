var ObstacleGroup = Obstacle.extend({
    _parts: null,
    _starDeltaY: 0,
    _presetColor: null,

    ctor: function (parts, starDeltaY) {
        this._super();

        this._parts = parts;
        if (starDeltaY !== undefined) {
            this._starDeltaY = starDeltaY;
        }
    },
    onEnter: function () {
        this._super();

        var colors = this._colors;
        this._presetColor = colors[0];

        if (this._parts.length == 2) {
            this._parts[0].setColors(colors, true);

            var others = [
                colors[3],
                colors[0],
                colors[2],
                colors[1]
            ];
            if (this._parts[0] instanceof ObstacleCross) {
                others = [
                    colors[3],
                    colors[2],
                    colors[0],
                    colors[1]
                ];
            }

            this._parts[1].setColors(others, true);
        }

        _.forEach(this._parts, function (v, k) {
            this.addChild(v);
        }.bind(this));

        if (this._autoAddStar) {
            this.addStar(this._starDeltaY);
        }
        if (this._autoAddSwitch) {
            this.addSwitch(this.getMaxHeight() + 40);
        }
    },
    getMaxHeight: function () {
        var max = 0;
        _.forEach(this._parts, function (v, k) {
            var h = v.getMaxHeight();
            max = Math.max(max, h);
        }.bind(this));
        return max;
    }
});

ObstacleGroup.create = function (args) {
    if (args.x === undefined) {
        args.x = 0;
    }

    _.forEach(args.parts, function (v, k) {
        v.child = true;
        if (v.x === undefined) {
            v.x = Math.pow(-1, k + 1) * args.x;
        }
        if (args.speed !== undefined) {
            v.speed = Math.pow(-1, k) * args.speed;
        }
        args.parts[k] = Obstacle.create(v);
    });

    delete args.x;
    delete args.speed;

    return new ObstacleGroup(args.parts, args.starDeltaY);
};