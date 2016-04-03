var Ball = PhysicsSprite.extend({
    _circle: null,
    _radius: 15,
    _active: true,
    ctor: function () {
        this._super();

        this.setAnchorPoint(0.5, 0.5);

        this._circle = new cc.DrawNode();
        this.changeBall();
        this.addChild(this._circle);

        var body = new cp.Body(1, cp.momentForCircle(1, 0, this._radius, cp.vzero));
        body.userData = this;
        util.space.addBody(body);

        var shape = new cp.CircleShape(body, this._radius / 2, cp.vzero);
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

        cc.eventManager.addListener(cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: util.EVENT_CHANGE_BALL,
            callback: this.changeBall.bind(this)
        }), this);
    },
    getWorldPosition: function () {
        var _pos = this._circle.getPosition();
        return this.convertToWorldSpace(_pos)
    },
    jump: function (event) {
        if (this._active) {
            var body = this.getBody(),
                v = body.getVel().y;
            body.applyImpulse(cp.v(0, Math.abs(400 - v)), cp.vzero);
        }
    },
    gameOver: function () {
        this.unscheduleUpdate();
        this.removeFromParent(true);
    },
    changeBall: function () {
        var colors = util.COLORS,
            preset = null;
        /*if (util.gameLayer && util.gameLayer._obstacles.length > util.currentIndex) {
            var obstacle = util.gameLayer._obstacles[util.currentIndex];
            preset = obstacle._presetColor;
            colors = obstacle._colors;
        }*/
        if (preset) {
            util.ballColor = preset;
        } else {
            var others = _.xor(colors, [util.ballColor]);
            util.ballColor = _.sample(others);
        }
        this._circle.clear();
        this._circle.drawDot(cc.p(0, 0), this._radius, util.ballColor);
        this._circle.setColor(util.ballColor);
    }
});