var GameLayer = cc.Layer.extend({
    _earth: null,
    _dead: false,
    ctor: function () {
        this._super();
        util.gameLayer = this;

        this._earth = new Earth();
        this._earth.setPosition(util.center.x, util.center.y);
        this.addChild(this._earth);

        cc.eventManager.addListener(cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: util.EVENT_GAME_OVER,
            callback: this.gameOver.bind(this)
        }), this);
    },
    onEnter: function () {
        this._super();

        var obstacle = Obstacle.get();
        obstacle.setPosition(util.center);
        this.addChild(obstacle);

        // util.addDebugNode.apply(this);

        util.space.addCollisionHandler(util.COLLISION_BALL, util.COLLISION_OBSTACLE,
            this.checkExplode.bind(this), null, null, null);

        util.space.addCollisionHandler(util.COLLISION_BALL, util.COLLISION_OBSTACLE_CENTER,
            this.updateCurrentIndex.bind(this), null, null, null);

        util.space.addCollisionHandler(util.COLLISION_BALL, util.COLLISION_STAR,
            this.winScore.bind(this), null, null, null);

        util.space.addCollisionHandler(util.COLLISION_BALL, util.COLLISION_SWITCH,
            this.switchBallColor.bind(this), null, null, null);
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
    sendGameOver: function () {
        var pos = this._earth.getPosition();
        cc.eventManager.dispatchCustomEvent(
            util.EVENT_GAME_OVER,
            pos
        );
    },
    gameOver: function (event) {
        this.unscheduleUpdate();
        this.explode(event.getUserData());
        this.earthQuake();
    },
    checkExplode: function (arbiter, space) {
        if (arbiter.b.color != util.ballColor && this._dead == false) {
            this._dead = true;
            space.addPostStepCallback(function(){
                this.sendGameOver();
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
    }
});