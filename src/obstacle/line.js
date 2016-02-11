var ObstacleLine = ObstacleSector.extend({
    _startDegree: 0,
    _thick: 25,
    _speed: 7,
    ctor: function (thick) {
        if (thick === undefined) {
            thick = this._thick;
        }
        this._super(thick / 2, thick, 0, cc.winSize.width);
    },
    getMaxHeight: function () {
        return this._thick;
    },
    drawOperate: function (args) {
        args.start -= cc.winSize.width / 2;
        this.drawRect(
            cc.p(args.start, -this._radius),
            cc.p(args.start + args.degree, this._radius),
            args.color,
            0,
            args.color
        );
        var pos = this.getPosition();
        var shape = new cp.BoxShape2(util.space.staticBody, cp.bb(
            pos.x + args.start,
            pos.y - this._radius,
            pos.x + args.start + args.degree,
            pos.y + this._radius
        ));
        shape.setSensor(true);
        shape.setCollisionType(util.COLLISION_OBSTACLE);
        shape.color = args.color;
        shape.obstacle = this;
        util.space.addShape(shape);
        this._shapes.push(shape);
    }
});

ObstacleLine.create = function (args) {
    return new ObstacleLine(args.thick);
};