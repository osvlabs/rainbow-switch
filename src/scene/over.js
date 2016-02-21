var GameOverScene = cc.Scene.extend({
    onEnter: function () {
        this._super();

        var btn = util.iconBtn(util.ICON_PLAY_CIRCLE, 150, this.start.bind(this));
        btn.setPosition(util.center);
        this.addChild(btn);
    },
    start: function () {
        cc.director.runScene(cc.TransitionFade.create(0.5, new GameScene()));
    }
});