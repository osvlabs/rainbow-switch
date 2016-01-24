var Slogan = cc.Node.extend({
    rh: null,
    rainbow: null,
    ctor: function () {
        this._super();

        this.setAnchorPoint(0.5, 0.5);

        this.rh = new cc.Sprite(res.rh);
        this.rh.setPosition(0, -45);
        this.addChild(this.rh);

        this.rainbow = new cc.Sprite(res.rainbow);
        this.rainbow.setPosition(0, 45);
        this.addChild(this.rainbow);
    }
});