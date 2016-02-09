var Switch = Obstacle.extend({
    _radius: 25,
    onEnter: function () {
        this._super();

        this.unschedule(this.move);
    },
    move: function () {
        var degree = 360 / this._colors.length;
        for(var i = 0; i < this._colors.length; i++) {
            this.drawSector(this.center(), this._radius, this._radius, i * degree, degree, this._colors[i]);
        }

        var shape = new cp.CircleShape(util.space.staticBody, this._radius, this.getPosition());
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