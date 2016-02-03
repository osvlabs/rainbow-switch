var Ball = PhysicsSprite.extend({
    TIME: 0.3,
    label: null,
    ctor: function () {
        this._super();

        this.setAnchorPoint(0.5, 0.5);

        this.label = util.icon(util.ICON_CIRCLE, 35);
        this.label.setColor(util.ballColor);
        this.addChild(this.label);

        var size = cc.size(35, 35);
        var body = new cp.Body(1, cp.momentForCircle(1, 0, size.width / 2, cp.vzero));
        body.userData = this;
        util.space.addBody(body);

        var shape = new cp.CircleShape(body, size.width / 2, cp.vzero);
        shape.setCollisionType(util.COLLISION_BALL);
        util.space.addShape(shape);

        this.setBody(body);
        this.setIgnoreBodyRotation(true);
    },
    onEnter: function () {
        this._super();

        cc.eventManager.addListener(cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: util.EVENT_JUMP,
            callback: this.jump.bind(this)
        }), this);

        cc.eventManager.addListener(cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: util.EVENT_GAME_OVER,
            callback: this.gameOver.bind(this)
        }), this);
    },
    getWorldPosition: function () {
        var _pos = this.label.getPosition();
        return this.convertToWorldSpace(_pos)
    },
    jump: function (event) {
        var v = this.getBody().getVel().y;
        this.getBody().applyImpulse(cp.v(0, Math.abs(500 - v)), cp.vzero);
    },
    gameOver: function () {
        this.unscheduleUpdate();
        this.removeFromParent(true);
    }
});