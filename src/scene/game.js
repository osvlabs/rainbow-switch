var GameScene = cc.Scene.extend({
    ctor: function () {
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
        ball.setPosition(util.center.x, 200);
        this.addChild(ball);
    },
    onEnter: function () {
        this._super();

        cc.eventManager.addListener(cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch) {
                cc.eventManager.dispatchEvent(
                    new cc.EventCustom(util.EVENT_JUMP)
                );
                return true;
            },
            onTouchEnded: function (touch, event) {
                cc.eventManager.dispatchEvent(
                    new cc.EventCustom(util.EVENT_JUMP_END)
                );
            },
            onTouchCancelled: function (touch, event) {
                this.onTouchEnded(touch, event);
            }
        }), this);
    }
});