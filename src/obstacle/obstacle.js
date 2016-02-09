var Obstacle = cc.DrawNode.extend({
    _vertCount: 50,
    _shapes: null,
    _colors: null,
    _speed: 1,
    _interval: 0.04,
    _autoAddShape: true,
    _star: null,
    _switch: null,
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
    /**
     * Add star
     * @param {cc.Point} pos
     * @param {int} [score=1]
     */
    addStar: function (pos, score) {
        this._star = new Star(score);
        this._star.setPosition(pos.x, pos.y);
        this.addChild(this._star);
    },
    addSwitch: function (deltaY) {
        this._switch = new Switch();
        this._switch.setPosition(0, deltaY);
        this.addChild(this._switch);
    },
    onEnter: function () {
        this._super();
        if (this._colors.length <= 0) {
            this.setColors(4);
        }

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
    drawSector: function (origin, radius, thick, startDegree, angleDegree, fillColor) {
        var angleStart = cc.degreesToRadians(startDegree),
            angleStep = cc.degreesToRadians(angleDegree) / (this._vertCount - 1),
            verts = [],
            vertsReversed = [];
        for (var i = 0; i < this._vertCount; i++)
        {
            var rads = angleStart + angleStep * i,
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

            this.drawPoly(_verts, fillColor, 0, fillColor);

            if (this._autoAddShape) {
                var shape = new cp.PolyShape(util.space.staticBody, util.cpVerts(_verts), cc.pSub(this.getPosition(), this.center()));
                shape.setSensor(true);
                shape.setCollisionType(util.COLLISION_OBSTACLE);
                shape.color = fillColor;
                shape.obstacle = this;
                util.space.addShape(shape);
                this._shapes.push(shape);
            }
        }
    }
});