var Obstacle = cc.DrawNode.extend({
    _vertCount: 50,
    _shapes: null,
    _centerShape: null,
    _centerShapeDeltaY: 0,
    _colors: null,
    _speed: 1,
    _interval: 0.04,
    _delta: 0,
    _autoAddShape: true,
    _star: null,
    _switch: null,
    _height: null,
    _index: 0,
    ctor: function () {
        this._super();
        this.setAnchorPoint(0.5, 0.5);
        this._colors = [];
        this._shapes = [];
    },
    setColors: function (colors) {
        if (_.isNumber(colors)) {
            colors = _.sampleSize(util.COLORS, colors);
            if (_.indexOf(colors, util.ballColor) < 0) {
                colors.push(util.ballColor);
                colors = _.tail(colors);
            }
        } else {
            colors = colors || _.clone(util.COLORS);
        }
        this._colors = _.shuffle(colors);
    },
    setSpeed: function (speed) {
        this._speed = speed;
    },
    setInterval: function (v) {
        this._interval = v;
    },
    setAutoAddShape: function (v) {
        this._autoAddShape = v;
    },
    getHeight: function () {
        if (this._height !== null) {
            return this._height;
        }
        this._height = this.getMaxHeight();
        return this._height;
    },
    getMaxHeight: function () {
        return 0;
    },
    getSwitchHeight: function () {
        return this._switch ? 220 : 0;
    },
    getChildX: function () {
        return util.center.x - this.getPositionX();
    },
    /**
     * Add star
     * @param {int} y
     * @param {int} [score=1]
     */
    addStar: function (y, score) {
        this._star = new Star(score);
        this._star.setPosition(this.getChildX(), y);
        this.addChild(this._star);
    },
    addSwitch: function (y) {
        this._switch = new Switch();
        this._switch.setPosition(this.getChildX(), y);
        this.addChild(this._switch);
    },
    addCenterShape: function () {
        var shape = new cp.CircleShape(
            util.space.staticBody,
            10,
            cp.v(
                util.center.x,
                this.getPositionY() + this._centerShapeDeltaY
            )
        );
        shape.setSensor(true);
        shape.setCollisionType(util.COLLISION_OBSTACLE_CENTER);
        shape.obstacle = this;
        util.space.addShape(shape);
        this._centerShape = shape;
    },
    onEnter: function () {
        this._super();
        if (this._colors.length <= 0) {
            this.setColors(4);
        }

        this.addCenterShape();

        this.schedule(this.move, this._interval);
        this.move();
    },
    onExit: function () {
        this.clearShapes();
        this._super();
    },
    center: function () {
        var size = this.getContentSize();
        return cc.p(size.width / 2, size.height / 2);
    },
    move: function () {
        // Do nothing here
    },
    clear: function () {
        this._super();
        this.clearShapes();
    },
    clearShapes: function () {
        _.forEach(this._shapes, function (v, k) {
            if (util.space.containsShape(v)) {
                util.space.removeShape(v);
            }
        });
        this._shapes.length = 0;
    },
    getSectorVerts: function (origin, radius, thick, startDegree, angleDegree) {
        var start = cc.degreesToRadians(startDegree),
            step = cc.degreesToRadians(angleDegree) / (this._vertCount - 1),
            verts = [],
            vertsReversed = [],
            result = [];
        for (var i = 0; i < this._vertCount; i++)
        {
            var rads = start + step * i,
                cos = Math.cos(rads),
                sin = Math.sin(rads),
                x = origin.x + radius * cos,
                y = origin.y + radius * sin;
            verts.push(cc.p(x, y));

            x -= thick * cos;
            y -= thick * sin;
            vertsReversed.push(cc.p(x, y));
        }
        vertsReversed = _.reverse(vertsReversed);

        for (i = 0; i < this._vertCount - 1; i++) {
            var p1 = vertsReversed[i],
                p2 = vertsReversed[i + 1],
                p3 = verts[this._vertCount - 2 - i],
                p4 = verts[this._vertCount - 1 - i],
                _verts = [p4, p3, p2, p1];

            result.push(_verts);
        }

        return result;
    },
    drawSector: function (origin, radius, thick, startDegree, angleDegree, fillColor) {
        var verts = this.getSectorVerts(origin, radius, thick, startDegree, angleDegree);

        _.forEach(verts, function (_verts, k) {
            this.drawPoly(_verts, fillColor, 0, fillColor);
            if (this._autoAddShape) {
                var shape = new cp.PolyShape(
                    util.space.staticBody,
                    util.cpVerts(_verts), cc.pSub(this.getPosition(), this.center())
                );
                this.addShape(shape, fillColor);
            }
        }.bind(this));
    },
    addShape: function (shape, color) {
        shape.setSensor(true);
        shape.setCollisionType(util.COLLISION_OBSTACLE);
        shape.color = color;
        shape.obstacle = this;
        util.space.addShape(shape);
        this._shapes.push(shape);
    }
});

Obstacle.create = function (type, args) {
    var clsName = 'Obstacle' + _.capitalize(type),
        cls = eval(clsName);
    if (cls && cls.create) {
        var o = cls.create(args);

        if (args.colors !== undefined) {
            o.setColors(args.colors);
        }
        if (args.speed !== undefined) {
            o.setSpeed(args.speed);
        }
        if (args.interval !== undefined) {
            o.setInterval(args.interval);
        }

        return o;
    }
    return null;
};