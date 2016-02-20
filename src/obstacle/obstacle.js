var Obstacle = cc.DrawNode.extend({
    _vertCount: 50,
    _shapes: null,

    // To detect pass
    _centerShape: null,
    _centerShapeDeltaY: 0,

    _colors: null,
    _speed: 1,
    _interval: 0.04,
    _delta: 0,
    _autoAddShape: true,
    _autoAddStar: true,
    _autoAddSwitch: true,
    _star: null,
    _switch: null,
    _height: null,
    _index: 0,
    _child: false,

    // For shake feature
    _shake: 0,
    _shakeSpeed: 2,
    _currentShakeSpeed: 2,
    _deltaY: 0,

    ctor: function () {
        this._super();
        this.setAnchorPoint(0.5, 0.5);
        this._colors = [];
        this._shapes = [];
    },
    setColors: function (colors, doNotShuffle) {
        if (_.isNumber(colors)) {
            colors = _.sampleSize(util.COLORS, colors);
            if (_.indexOf(colors, util.ballColor) < 0) {
                colors.push(util.ballColor);
                colors = _.tail(colors);
            }
        } else {
            colors = colors || _.clone(util.COLORS);
        }
        if (!doNotShuffle) {
            colors = _.shuffle(colors);
        }
        this._colors = colors;
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
    setShake: function (shake, speed) {
        if (shake !== undefined) {
            this._shake = shake;
        }
        if (speed !== undefined) {
            this._shakeSpeed = Math.abs(speed);
        }
        this._currentShakeSpeed = this._shakeSpeed;
    },
    stepDeltaY: function () {
        if (this._shake == 0) {
            return;
        }
        var nextShake = this._deltaY + this._shakeSpeed;
        if (nextShake > this._shake) {
            this._currentShakeSpeed = -this._shakeSpeed;
        } else if (nextShake < -this._shake) {
            this._currentShakeSpeed = this._shakeSpeed;
        }
        this._deltaY += this._currentShakeSpeed;
    },
    getShakedCenter: function () {
        var center = this.center();
        return cc.p(center.x, center.y + this._deltaY);
    },
    pAddDeltaY: function (p) {
        return cc.pAdd(p, cc.p(0, this._deltaY));
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
        this.clear();

        this._delta += this._speed;
        this.stepDeltaY();
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
    getLayerPosition: function () {
        if (!this._child) {
            return this.getPosition();
        }
        return cc.pAdd(this.getPosition(), this.parent.getPosition());
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
                    util.cpVerts(_verts), cc.pSub(this.getLayerPosition(), this.center())
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

Obstacle.create = function (args) {
    var clsName = 'Obstacle' + args.type,
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
        if (args.shake !== undefined) {
            o.setShake(args.shake, args.shakeSpeed);
        }
        if (args.star === false || args.child === true) {
            o._autoAddStar = false;
        }
        if (args.switch === false || args.child === true) {
            o._autoAddSwitch = false;
        }
        if (args.child === true) {
            o._child = true;
        }

        var x = util.center.x;
        if (o._child) {
            x = 0;
        }
        if (args.x !== undefined) {
            x += args.x;
        }
        var y = 0;
        if (args.y !== undefined) {
            y = args.y;
        }
        o.setPosition(x, y);

        return o;
    }
    return null;
};