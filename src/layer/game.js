var GameLayer = cc.Layer.extend({
    _earth: null,
    _dead: false,
    ctor: function () {
        this._super();
    },
    onEnter: function () {
        this._super();
        util.gameLayer = this;

        this._earth = new Ball();
        this._earth.setPosition(util.center.x, util.center.y);
        this.addChild(this._earth);

        util.addDebugNode.apply(this);

        util.space.addCollisionHandler(util.COLLISION_BALL, util.COLLISION_OBSTACLE,
            this.checkExplode.bind(this), null, null, null);

        util.space.addCollisionHandler(util.COLLISION_BALL, util.COLLISION_OBSTACLE_CENTER,
            this.updateCurrentIndex.bind(this), null, null, null);

        util.space.addCollisionHandler(util.COLLISION_BALL, util.COLLISION_STAR,
            this.winScore.bind(this), null, null, null);

        util.space.addCollisionHandler(util.COLLISION_BALL, util.COLLISION_SWITCH,
            this.switchBallColor.bind(this), null, null, null);

        util.space.addCollisionHandler(util.COLLISION_BALL, util.COLLISION_FINISH_LINE,
            this.finish.bind(this), null, null, null);

        this.scheduleUpdate();
    },
    update: function (dt) {
        this._super(dt);
        this._dead = false;

        var pos = this._earth.getWorldPosition();
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
            var o = Obstacle.create(_.cloneDeep(v));
            o._index = k + 1;

            var height = o.getHeight(),
                _y = y + height / 2;
            if (v.type == 'Sector') {
                _y -= v.radius;
            }

            o.setPositionY(_y);
            this.addChild(o);

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
        fw.setPosition(this._earth.getPosition());
        this.addChild(fw);
    },
    gameOver: function () {
        var pos = this._earth.getPosition();
        cc.eventManager.dispatchCustomEvent(
            util.EVENT_GAME_OVER,
            pos
        );
        this.unscheduleUpdate();
        this.explode(pos);
        this.earthQuake();
    },
    finish: function (arbiter, space) {
        space.addPostStepCallback(function(){
            cc.eventManager.dispatchCustomEvent(util.EVENT_FINISH);
            this.unscheduleUpdate();
            this.firework();
        }.bind(this));
        return true;
    },
    checkExplode: function (arbiter, space) {
        if (arbiter.b.color != util.ballColor && this._dead == false) {
            this._dead = true;
            space.addPostStepCallback(function(){
                this.gameOver();
            }.bind(this));
        }
        return true;
    },
    updateCurrentIndex: function (arbiter, space) {
        space.addPostStepCallback(function () {
            util.currentIndex = Math.max(
                util.currentIndex,
                arbiter.b.obstacle._index
            );
        }.bind(this));
        return true;
    },
    winScore: function (arbiter, space) {
        space.addPostStepCallback(function(){
            arbiter.b.object.winScore();
        }.bind(this));
        return true;
    },
    switchBallColor: function (arbiter, space) {
        space.addPostStepCallback(function(){
            arbiter.b.object.onCollisionDetected();
        }.bind(this));
        return true;
    },
});