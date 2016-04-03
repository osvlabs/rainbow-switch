var Earth = PhysicsSprite.extend({
    image: null,
    mask: null,
    lifeCount: 3,
    ctor: function () {
        this._super();

        this.image = new cc.Sprite(res.earth);
        this.addChild(this.image);

        var size = this.image.getContentSize();
        var radius = size.width / 2;

        this.setContentSize(size);
        this.image.setPosition(radius, radius);

        this.mask = new cc.DrawNode();
        this.mask.drawDot(cc.p(0, 0), radius, cc.color(255, 0, 0, 0));
        this.mask.setPosition(radius, radius);
        this.addChild(this.mask);

        var body = new cp.Body(1, cp.momentForCircle(1, 0, radius, cp.vzero));
        body.userData = this;
        util.space.addBody(body);

        var shape = new cp.CircleShape(body, radius, cp.vzero);
        shape.setCollisionType(util.COLLISION_EARTH);
        shape.sensor = true;
        util.space.addShape(shape);

        this.setBody(body);
        this.setIgnoreBodyRotation(true);

        util.earth = this;
    },
    onEnterTransitionDidFinish: function () {
        this._super();

        this.image.runAction(cc.rotateBy(36, 360).repeatForever());
    },
    damage: function () {
        this.lifeCount--;
        if (this.lifeCount <= 0) {
            cc.eventManager.dispatchCustomEvent(
                util.EVENT_GAME_OVER,
                util.center
            );
            return;
        }
        this.mask.clear();
        this.mask.drawDot(cc.p(0, 0), this.image.getContentSize().width / 2, cc.color(255, 0, 0, (1 - this.lifeCount / 3) * 255));
    }
});