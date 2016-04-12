var HomeLayer = cc.Layer.extend({
    _slogon: null,
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
        this.setPositionY(util.center.y);
        this.setOpacity(0);

        this.runAction(cc.spawn([
            cc.moveTo(1, cc.p(0, 0)).easing(cc.easeBounceOut()),
            cc.fadeIn(0.6)
        ]));

        this.scheduleOnce(function () {
            this.slogan.runAction(cc.sequence([
                cc.moveBy(0.8, 0, 20).easing(cc.easeSineIn()),
                cc.moveBy(1, 0, -20).easing(cc.easeBounceOut()),
                cc.delayTime(0.8)
            ]).repeatForever());
        }.bind(this), 1);
    },
    moveOut: function () {
        this.slogan.stopAllActions();

        this.runAction(cc.spawn([
            cc.moveTo(1, cc.p(0, util.center.y)).easing(cc.easeBackIn()),
            cc.fadeOut(0.6)
        ]));
    }
});