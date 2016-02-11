var GameLayer = cc.LayerColor.extend({
    _ball: null,
    _dead: false,
    _scoreLabel: null,
    _obstacles: null,
    ctor: function () {
        this._super(util.COLOR_DARK);

        this.setContentSize(cc.winSize.width, 10000);
        this._obstacles = [];
    },
    onEnter: function () {
        this._super();
        util.gameLayer = this;

        var y = this.addObstacles();

        var hand = util.icon(util.ICON_HAND_O_UP, 100);
        hand.setPosition(util.center.x + 8, 100);
        this.addChild(hand);

        var slogan = new Slogan();
        slogan.setPosition(util.center.x, 400);
        this.addChild(slogan);

        slogan = new Slogan();
        slogan.setPosition(util.center.x, y + 250);
        this.addChild(slogan);

        var tape = new Tape();
        tape.setPosition(util.center.x, y);
        this.addChild(tape);

        this._ball = new Ball();
        this._ball.setPosition(util.center.x, 217);
        this.addChild(this._ball);

        util.addDebugNode.apply(this);

        util.space.addCollisionHandler(
            util.COLLISION_BALL,
            util.COLLISION_OBSTACLE,
            function (arbiter, space) {
                if (arbiter.b.color != util.ballColor && this._dead == false) {
                    this._dead = true;
                    space.addPostStepCallback(function(){
                        this.gameOver();
                    }.bind(this));
                }
                space.addPostStepCallback(function () {
                    util.currentIndex = Math.max(
                        util.currentIndex,
                        arbiter.b.obstacle._index
                    );
                }.bind(this));
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

        util.space.addCollisionHandler(
            util.COLLISION_BALL,
            util.COLLISION_FINISH_LINE,
            function (arbiter, space) {
                space.addPostStepCallback(function(){
                    this.finish();
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
            this.gameOver();
        } else {
            if (pos.y > util.center.y) {
                this.move(util.center.y - pos.y);
            }
        }
    },
    addObstacles: function () {
        var y = 600;
        _.forEach(util.currentLevels(), function (v, k) {
            var o = Obstacle.create(v.type, v);
            o._index = k + 1;

            var height = o.getHeight(),
                _y = y + height / 2;
            if (v.type == 'sector') {
                _y -= v.radius;
            }
            o.setPosition(util.center.x, _y);
            this.addChild(o);
            this._obstacles.push(o);

            y += height + o.getSwitchHeight();
        }.bind(this));

        return y;
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
    firework: function () {
        var fw = new cc.ParticleSystem(res.firework);
        fw.setPosition(this._ball.getPosition());
        this.addChild(fw);
    },
    gameOver: function () {
        var pos = this._ball.getPosition();
        cc.eventManager.dispatchCustomEvent(
            util.EVENT_GAME_OVER,
            pos
        );
        this.unscheduleUpdate();
        this.explode(pos);
        this.earthQuake();
    },
    finish: function () {
        cc.eventManager.dispatchCustomEvent(util.EVENT_FINISH);
        this.unscheduleUpdate();
        this.firework();
    }
});