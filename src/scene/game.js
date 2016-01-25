var GameScene = cc.Scene.extend({
    ctor: function () {
        this._super();

        this.initPhysics();

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

        //util.addDebugNode.apply(this);
    },
    initPhysics: function () {
        var space = new cp.Space();
        space.gravity = cp.v(0, -1000);

        var wall = new cp.SegmentShape(space.staticBody, cp.v(0, 200),
            cp.v(cc.winSize.width, 200), 0);
        space.addStaticShape(wall);

        space.setDefaultCollisionHandler(function (arb, space) {
            //cc.log(arb);
            return true;
        }, null, null, null);

        util.space = space;
    },
    onEnter: function () {
        this._super();

        this.scheduleUpdate();

        cc.eventManager.addListener(cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch) {
                cc.eventManager.dispatchEvent(
                    new cc.EventCustom(util.EVENT_JUMP)
                );
                return true;
            }
        }), this);
    },
    update: function (dt) {
        this._super(dt);
        util.space.step(dt);
    }
});