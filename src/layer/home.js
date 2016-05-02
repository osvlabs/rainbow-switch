var HomeLayer = TopLayer.extend({
    slogan: null,
    ctor: function () {
        this._super();

        this.slogan = new cc.Sprite(res.slogan);
        this.slogan.setPosition(util.center.x, cc.winSize.height * 0.7);
        this.addChild(this.slogan);
    },
    onEnter: function () {
        this._super();

        this.moveIn();
    },
    moveIn: function () {
        this._super();

        this.scheduleOnce(function () {
            this.slogan.runAction(cc.sequence([
                cc.moveBy(0.8, 0, 20).easing(cc.easeSineIn()),
                cc.moveBy(1, 0, -20).easing(cc.easeSineOut())
            ]).repeatForever());
        }.bind(this), 1);
    },
    moveOut: function () {
        this.slogan.stopAllActions();

        this._super();
    }
});