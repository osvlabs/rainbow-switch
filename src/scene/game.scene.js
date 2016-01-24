var GameScene = cc.Scene.extend({
    ctor: function () {
        this._super();

        var bgLayer = new cc.LayerColor(util.COLOR_DARK);
        this.addChild(bgLayer);
    }
});