var GamePassScene = cc.Scene.extend({
    onEnter: function () {
        this._super();

        var label = util.label('Mission completed!', 60);
        label.setPosition(util.center.x, cc.winSize.height * 0.75);
        this.addChild(label);

        var btn = new ScaleSprite(undefined, this.start.bind(this));
        btn.setPosition(util.center);
        btn.setContentSize(cc.size(150, 150));
        btn.setAnchorPoint(0.5, 0.5);
        this.addChild(btn);

        var icon = util.icon(util.ICON_PLAY, 150);
        icon.setAnchorPoint(0, 0);
        btn.addChild(icon);
    },
    start: function () {
        cc.director.runScene(cc.TransitionFade.create(0.5, new GameScene()));
    }
});