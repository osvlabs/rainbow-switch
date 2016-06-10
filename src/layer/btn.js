var BtnLayer = BaseLayer.extend({
    fromY: 0,
    toY: 0,
    play: null,
    playing: false,
    ctor: function () {
        this._super();
        this.fromY = -util.center.y;

        this.play = new ScaleSprite('#play.png', null, this.onPlay.bind(this));
        this.play.setPosition(util.center.x, cc.winSize.height * 0.3);
        this.addChild(this.play);
    },
    onEnter: function () {
        this._super();

        this.moveIn();
    },
    moveIn: function () {
        this.play.setScale(0.8);

        this._super();
        this.playing = false;

        this.scheduleOnce(function () {
            this.play.runAction(cc.sequence([
                cc.scaleTo(0.5, 1, 0.5).easing(cc.easeBackIn()),
                cc.scaleTo(0.3, 0.8).easing(cc.easeBounceOut()),
                cc.delayTime(2)
            ]).repeatForever());
        }.bind(this), 1);
    },
    moveOut: function () {
        this.play.stopAllActions();

        this._super();
    },
    onPlay: function () {
        if (this.playing) {
            return;
        }
        this.playing = true;
        cc.eventManager.dispatchCustomEvent(util.EVENT_PLAY);
    }
});