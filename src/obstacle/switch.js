var Switch = Obstacle.extend({
    _radius: 25,
    _autoAddShape: false,
    ctor: function () {
        this._super(false);
    },
    onEnter: function () {
        cc.DrawNode.prototype.onEnter.call(this);
        this.setColors(4);
        this.move();
    },
    move: function () {
        var degree = 360 / this._colors.length;
        for(var i = 0; i < this._colors.length; i++) {
            this.drawSector(this.center(), this._radius, this._radius, i * degree, degree, this._colors[i]);
        }

        var pos = this.getPosition();
        if (this.parent instanceof Obstacle) {
            pos = cc.pAdd(pos, this.parent.getPosition());
        }
        var shape = new cp.CircleShape(util.space.staticBody, this._radius, pos);
        shape.setSensor(true);
        shape.setCollisionType(util.COLLISION_SWITCH);
        shape.object = this;
        util.space.addShape(shape);
        this._shapes.push(shape);
    },
    onCollisionDetected: function () {
        cc.eventManager.dispatchCustomEvent(util.EVENT_CHANGE_BALL);
        this.removeFromParent(true);
    }
});