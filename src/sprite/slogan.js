var Slogan = cc.Node.extend({
    _rainbowWidth: 400,
    _interval: 2,
    _rh: null,
    _rainbow: null,
    _rainbowRect: null,
    _rainbowRectAgent: null,
    ctor: function () {
        this._super();

        this.setAnchorPoint(0.5, 0.5);

        this._rh = new cc.Sprite(res.rh);
        this._rh.setPosition(0, -45);
        this.addChild(this._rh);

        var rainbow = new cc.Sprite(res.rainbow);
        this._rainbow = new cc.ClippingNode(rainbow);
        this._rainbow.setAlphaThreshold(0.5);
        this._rainbow.setPosition(0, 45);
        this.addChild(this._rainbow);

        this._rainbowRect = new cc.Sprite(res.rainbow_rect);
        this._rainbow.addChild(this._rainbowRect);

        this._rainbowRectAgent = new cc.Sprite(res.rainbow_rect);
        this._rainbowRectAgent.setPosition(this._rainbowWidth, 0);
        this._rainbow.addChild(this._rainbowRectAgent);
    },
    onEnter: function () {
        this._super();

        this._rainbowRect.runAction(cc.sequence([
            cc.moveBy(this._interval, -this._rainbowWidth, 0),
            cc.place(this._rainbowWidth, 0),
            cc.moveBy(this._interval, -this._rainbowWidth, 0)
        ]).repeatForever());

        this._rainbowRectAgent.runAction(cc.sequence([
            cc.moveBy(this._interval * 2, -this._rainbowWidth * 2, 0),
            cc.place(this._rainbowWidth, 0)
        ]).repeatForever());
    }
});