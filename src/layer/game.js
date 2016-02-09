var GameLayer = cc.LayerColor.extend({
    _ball: null,
    _dead: false,
    ctor: function () {
        this._super(util.COLOR_DARK);

        this.setContentSize(cc.winSize.width, 10000);
    },
    onEnter: function () {
        this._super();

        this.addObstacles();
        this.addStars();
        this.addSwitches();

        var hand = util.icon(util.ICON_HAND_O_UP, 100);
        hand.setPosition(util.center.x + 8, 100);
        this.addChild(hand);

        var slogan = new Slogan();
        slogan.setPosition(util.center.x, 400);
        this.addChild(slogan);

        this._ball = new Ball();
        this._ball.setPosition(util.center.x, 217);
        this.addChild(this._ball);

        //util.addDebugNode.apply(this);

        util.space.addCollisionHandler(
            util.COLLISION_BALL,
            util.COLLISION_OBSTACLE,
            function (arbiter, space) {
                if (arbiter.b.color != util.ballColor && this._dead == false) {
                    this._dead = true;
                    space.addPostStepCallback(function(){
                        this.startGameOver();
                    }.bind(this));
                }
                return true;
            }.bind(this),
            null,
            null,
            null
        );

        util.space.addCollisionHandler(
            util.COLLISION_BALL,
            util.COLLISION_STAR,
            function (arbiter, space) {
                space.addPostStepCallback(function(){
                    arbiter.b.object.winScore();
                }.bind(this));
                return true;
            }.bind(this),
            null,
            null,
            null
        );

        util.space.addCollisionHandler(
            util.COLLISION_BALL,
            util.COLLISION_SWITCH,
            function (arbiter, space) {
                space.addPostStepCallback(function(){
                    arbiter.b.object.onCollisionDetected();
                }.bind(this));
                return true;
            }.bind(this),
            null,
            null,
            null
        );

        this.scheduleUpdate();
    },
    update: function (dt) {
        this._super(dt);
        this._dead = false;

        var pos = this._ball.getWorldPosition();
        if (pos.y <= 0) {
            this.startGameOver();
        } else {
            if (pos.y > util.center.y) {
                this.move(util.center.y - pos.y);
            }
        }
    },
    addObstacles: function () {
        var circle = new ObstacleSector(600, 25, 60, 60, 70);
        circle.setPosition(util.center.x, 50);
        this.addChild(circle);
    },
    addStars: function () {
        var star = new Star();
        star.setPosition(util.center.x, 750);
        this.addChild(star);
    },
    addSwitches: function () {
        var star = new Switch();
        star.setPosition(util.center.x, 950);
        star.setAutoAddShape(false);
        this.addChild(star);
    },
    move: function(y) {
        this.setPositionY(this.getPositionY() + y);
    },
    explode: function (pos) {
        pos.y += 15;
        for(var i = 0; i < 30; i++) {
            var debris = new Debris(pos);
            this.addChild(debris);
        }
    },
    earthQuake: function () {
        var amplitude = 10,
            frequency = 0.1;
        this.runAction(cc.sequence([
            cc.moveBy(frequency, cc.p(-amplitude, -amplitude)).easing(cc.easeBackInOut()),
            cc.moveBy(frequency, cc.p(2 * amplitude, 0)).easing(cc.easeBackInOut()),
            cc.moveBy(frequency, cc.p(-2 * amplitude, 2 * amplitude)).easing(cc.easeBackInOut()),
            cc.moveBy(frequency, cc.p(amplitude, -amplitude)).easing(cc.easeBackInOut())
        ]));
    },
    gameOver: function (pos) {
        this.explode(pos);
        this.earthQuake();
    },
    startGameOver: function () {
        var pos = this._ball.getPosition();
        cc.eventManager.dispatchCustomEvent(
            util.EVENT_GAME_OVER,
            pos
        );
        this.unscheduleUpdate();
        this.gameOver(pos);
    }
});