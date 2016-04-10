var Meteorite = PhysicsSprite.extend({
    ctor: function () {
        this._super(res.meteorite_lime);

        var size = this.getContentSize();
        cc.log(size);
        var body = new cp.Body(1, cp.momentForCircle(1, 0, size.width / 2, cp.vzero));
        body.userData = this;
        util.space.addBody(body);

        var shape = new cp.CircleShape(body, size.width / 2, cp.vzero);
        shape.setCollisionType(util.COLLISION_METEORITE);
        shape.setSensor(true);
        util.space.addShape(shape);

        this.setBody(body);
        this.setIgnoreBodyRotation(true);
    }
});