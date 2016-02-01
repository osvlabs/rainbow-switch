var GameLayer = cc.LayerColor.extend({
    ball: null,
    obstacles: [],
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

        this.ball = new Ball();
        this.ball.setPosition(util.center.x, 217);
        this.addChild(this.ball);

        //util.addDebugNode.apply(this);

        this.scheduleUpdate();
    },
    update: function (dt) {
        this._super(dt);

        var pos = this.ball.getWorldPosition();
        if (pos.y <= 0) {
            cc.eventManager.dispatchCustomEvent(util.EVENT_GAME_OVER, this.ball.getPosition());
            this.unscheduleUpdate();
        } else {
            _.forEach(this.obstacles, function (v, k) {
                if (cc.rectContainsPoint(v.getBoundingBox(), pos) && v.pass(pos)) {
                    cc.log('die!!!');
                }
            });

            if (pos.y > util.center.y) {
                this.move(util.center.y - pos.y);
            }
        }
    },
    addObstacles: function () {
        var circle = new ObstacleSector(200, 30, 30, 120, [
            util.COLOR_RED,
            util.COLOR_GREEN,
            util.COLOR_YELLOW
        ], 10);
        circle.setPosition(util.center.x, 600);
        this.addChild(circle);
        this.obstacles.push(circle);
    },
    move: function(y) {
        this.setPositionY(this.getPositionY() + y);
    },
    explode: function (pos) {
        pos.y += 15;
        for(var i = 0; i < 50; i++) {
            var debris = new Debris(pos);
            this.addChild(debris);
        }
    }
});