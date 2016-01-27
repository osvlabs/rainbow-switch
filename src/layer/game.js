var GameLayer = cc.LayerColor.extend({
    ctor: function () {
        this._super(util.COLOR_DARK);

        this.setContentSize(cc.winSize.width, 10000);
    },
    onEnter: function () {
        this._super();

        this.addObstacles();

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

        util.addDebugNode.apply(this);
    },
    addObstacles: function () {
        var circle = new ObstacleCircle(100, 30);
        circle.setPosition(util.center.x, 600);
        this.addChild(circle);
    },
    move: function(event) {
        var dis = event.getUserData();
        if (!dis) {
            return;
        }
        this.runAction(cc.moveBy(0.2, dis).easing(cc.easeSineInOut()));
    },
    explode: function (pos) {
        pos.y += 15;
        for(var i = 0; i < 50; i++) {
            var debris = new Debris(pos);
            this.addChild(debris);
        }
    }
});