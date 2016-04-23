var HomeLayer = BaseLayer.extend({
    slogan: null,
    ctor: function () {
        this._super();

        this.slogan = new cc.Sprite(res.slogan);
        this.slogan.setPosition(util.center.x, cc.winSize.height * 0.7);
        this.addChild(this.slogan);

        var about = new ScaleSprite(res.about, null, this.showAboutPopup.bind(this));
        var size = about.getContentSize();
        about.setPosition(cc.winSize.width - size.width / 2 - 20, cc.winSize.height - size.height / 2 - 20);
        this.addChild(about);
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
    },
    showAboutPopup: function () {
    }
});