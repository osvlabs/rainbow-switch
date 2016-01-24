var Slogan = cc.Node.extend({
    RAINBOW_WIDTH: 400,
    TIME: 2,
    rh: null,
    rainbow: null,
    rainbowRect: null,
    rainbowRectAgent: null,
    ctor: function () {
        this._super();

        this.setAnchorPoint(0.5, 0.5);

        this.rh = new cc.Sprite(res.rh);
        this.rh.setPosition(0, -45);
        this.addChild(this.rh);

        var rainbow = new cc.Sprite(res.rainbow);
        this.rainbow = new cc.ClippingNode(rainbow);
        this.rainbow.setAlphaThreshold(0.5);
        this.rainbow.setPosition(0, 45);
        this.addChild(this.rainbow);

        this.rainbowRect = new cc.Sprite(res.rainbow_rect);
        this.rainbow.addChild(this.rainbowRect);

        this.rainbowRectAgent = new cc.Sprite(res.rainbow_rect);
        this.rainbowRectAgent.setPosition(this.RAINBOW_WIDTH, 0);
        this.rainbow.addChild(this.rainbowRectAgent);
    },
    onEnter: function () {
        this._super();

        this.rainbowRect.runAction(cc.sequence([
            cc.moveBy(this.TIME, -this.RAINBOW_WIDTH, 0),
            cc.place(this.RAINBOW_WIDTH, 0),
            cc.moveBy(this.TIME, -this.RAINBOW_WIDTH, 0)
        ]).repeatForever());

        this.rainbowRectAgent.runAction(cc.sequence([
            cc.moveBy(this.TIME * 2, -this.RAINBOW_WIDTH * 2, 0),
            cc.place(this.RAINBOW_WIDTH, 0)
        ]).repeatForever());
    }
});