var BgLayer = cc.LayerColor.extend({
    ctor: function () {
        this._super(cc.color.BLACK);
    },
    onEnter: function () {
        this._super();

        var particle = new cc.ParticleSystem(res.universe);
        this.addChild(particle);

        var earth = new Earth();
        earth.setPosition(util.center.x, util.center.y);
        this.addChild(earth);

        cc.eventManager.addListener(cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: util.EVENT_GAME_OVER,
            callback: this.earthQuake.bind(this)
        }), this);
    },
    earthQuake: function () {
        var amplitude = 10,
            frequency = 0.1;
        this.runAction(cc.sequence([
            cc.moveBy(frequency, cc.p(-amplitude, -amplitude)),
            cc.moveBy(frequency, cc.p(2 * amplitude, 0)),
            cc.moveBy(frequency, cc.p(-2 * amplitude, 2 * amplitude)),
            cc.moveBy(frequency, cc.p(1.5 * amplitude, -0.5 * amplitude)),
            cc.moveBy(frequency, cc.p(-0.5 * amplitude, -0.5 * amplitude))
        ]).easing(cc.easeSineInOut()));
    }
});