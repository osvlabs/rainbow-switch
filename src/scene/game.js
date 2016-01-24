var GameScene = cc.Scene.extend({
    ctor: function () {
        this._super();

        var bgLayer = new cc.LayerColor(util.COLOR_DARK);
        this.addChild(bgLayer);

        var hand = util.icon(util.ICON_HAND_O_UP, 100);
        hand.setPosition(util.center.x + 8, 100);
        this.addChild(hand);

        var ball = new Ball();
        ball.setPosition(util.center.x, 200);
        this.addChild(ball);

        var slogan = new Slogan();
        slogan.setPosition(util.center.x, 400);
        this.addChild(slogan);
    }
});