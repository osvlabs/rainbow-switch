var Ball = cc.PhysicsSprite.extend({
    TIME: 0.3,
    label: null,
    ctor: function () {
        this._super();

        this.setAnchorPoint(0.5, 0.5);

        this.label = util.icon(util.ICON_CIRCLE, 35);
        this.label.setColor(cc.color.WHITE);
        this.addChild(this.label);

        var size = cc.size(35, 35);
        var body = new cp.Body(1, cp.momentForCircle(1, 0, size.width / 2, cp.vzero));
        body.userData = this;
        util.space.addBody(body);

        var shape = new cp.CircleShape(body, size.width / 2, cp.vzero);
        util.space.addShape(shape);

        this.setBody(body);
        this.setIgnoreBodyRotation(true);
    },
    onEnter: function () {
        this._super();

        cc.eventManager.addListener(new cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: util.EVENT_JUMP,
            callback: this.jump.bind(this)
        }), this);
    },
    jump: function (event) {
        var v = this.getBody().getVel().y;
        this.getBody().applyImpulse(cp.v(0, Math.abs(500 - v)), cp.vzero);
    }
});