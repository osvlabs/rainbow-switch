var BtnLayer = cc.Layer.extend({
    play: null,
    ctor: function () {
        this._super();

        this.play = new cc.Sprite(res.play);
        this.play.setPosition(util.center.x, cc.winSize.height * 0.3);
        this.addChild(this.play);
    },
    onEnter: function () {
        this._super();

        this.moveIn();
    },
    moveIn: function () {
        this.setPositionY(-util.center.y);
        this.setOpacity(0);

        this.runAction(cc.spawn([
            cc.moveTo(1, cc.p(0, 0)).easing(cc.easeBounceOut()),
            cc.fadeIn(0.6)
        ]));

        this.scheduleOnce(function () {
            this.play.runAction(cc.sequence([
                cc.moveBy(0.8, 0, 20).easing(cc.easeSineIn()),
                cc.moveBy(1, 0, -20).easing(cc.easeBounceOut()),
                cc.delayTime(0.8)
            ]).repeatForever());
        }.bind(this), 1);
    },
    moveOut: function () {
        this.play.stopAllActions();

        this.runAction(cc.spawn([
            cc.moveTo(1, cc.p(0, -util.center.y)).easing(cc.easeBackIn()),
            cc.fadeOut(0.6)
        ]));
    }
});