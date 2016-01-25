var GameLayer = cc.Layer.extend({
    ctor: function () {
        this._super();

        this.setContentSize(cc.winSize.width, 10000);
    },
    onEnter: function () {
        this._super();

        var bgLayer = new cc.LayerColor(util.COLOR_DARK);
        this.addChild(bgLayer);

        var hand = util.icon(util.ICON_HAND_O_UP, 100);
        hand.setPosition(util.center.x + 8, 100);
        this.addChild(hand);

        var slogan = new Slogan();
        slogan.setPosition(util.center.x, 400);
        this.addChild(slogan);

        var ball = new Ball();
        ball.setPosition(util.center.x, 217);
        this.addChild(ball);

        cc.eventManager.addListener(cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: util.EVENT_MOVE_GAME_LAYER,
            callback: this.move.bind(this)
        }), this);
    },
    move: function(event) {
        var dis = event.getUserData();
        if (!dis) {
            return;
        }
        this.runAction(cc.moveBy(0.2, dis).easing(cc.easeSineInOut()));
    }
});