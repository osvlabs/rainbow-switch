var GameScene = cc.Scene.extend({
    ctor: function () {
        this._super();

        var bgLayer = new cc.LayerColor(util.COLOR_DARK);
        this.addChild(bgLayer);

        var label = util.icon(util.ICON_HAND, 100);
        label.setPosition(util.center.x, 100);
        this.addChild(label);

        var slogan = new Slogan();
        slogan.setPosition(util.center.x, 400);
        this.addChild(slogan);
    }
});