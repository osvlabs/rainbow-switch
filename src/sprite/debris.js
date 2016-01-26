var Debris = PhysicsSprite.extend({
    ctor: function (pos) {
        this._super();
        this.setAnchorPoint(0.5, 0.5);

        var radius = _.random(5, 30);
        var label = util.icon(util.ICON_CIRCLE, radius);
        label.setColor(_.sample(util.EXPLODE_COLORS));
        this.addChild(label);

        var size = cc.size(radius, radius);
        var body = new cp.Body(1, cp.momentForCircle(1, 0, size.width / 2, cp.vzero));
        body.userData = this;
        util.space.addBody(body);

        var shape = new cp.CircleShape(body, size.width / 2, cp.vzero);
        shape.setCollisionType(util.COLLISION_DEBRIS);
        shape.setElasticity(1);
        util.space.addShape(shape);

        this.setBody(body);
        this.setIgnoreBodyRotation(true);

        this.setPosition(pos);
    },
    onEnter: function () {
        this._super();

        this.getBody().applyImpulse(cp.v(
            this.getRandomNumber() * 100, this.getRandomNumber() * 100
        ), cp.vzero);
    },
    getRandomNumber: function () {
        var min = 4,
            max = 8,
            a = _.random(-max, -min),
            b = _.random(min, max);
        return _.random(1) ? a : b;
    }
});