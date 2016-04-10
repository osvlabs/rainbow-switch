var GameLayer = cc.Layer.extend({
    _earth: null,
    _previousLocation: null,
    _obstacle: null,
    _rotateSpeed: 4,
    _meteorite: null,
    _meteoritePoint: null,
    _meteoriteColor: null,
    _laser: null,
    _collisionDetected: false,
    ctor: function () {
        this._super();
        util.gameLayer = this;

        cc.eventManager.addListener(cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: util.EVENT_GAME_OVER,
            callback: this.gameOver.bind(this)
        }), this);

        cc.eventManager.addListener(cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch) {
                this._previousLocation = touch.getLocation();
                return true;
            }.bind(this),
            onTouchMoved: function (touch) {
                var location = touch.getLocation();
                var angle = this.getRadianOfPoints(util.center, location, util.center, this._previousLocation);
                this._previousLocation = location;
                cc.eventManager.dispatchCustomEvent(
                    util.EVENT_ROTATE,
                    angle
                );
                this._obstacle.increaseDelta(this.getDeltaByRadian(angle));
            }.bind(this)
        }), this);
    },
    onEnter: function () {
        this._super();

        this.addEarth();
        this.generateGuard();

        // util.addDebugNode.apply(this);

        util.space.addCollisionHandler(util.COLLISION_EARTH, util.COLLISION_METEORITE,
            this.checkGameOver.bind(this), null, null, null);

        util.space.addCollisionHandler(util.COLLISION_OBSTACLE, util.COLLISION_METEORITE,
            this.checkSuccess.bind(this), null, null, null);
    },
    checkGameOver: function (arbiter, space) {
        if (!this._collisionDetected) {
            this._collisionDetected = true;
            space.addPostStepCallback(function(){
                this.sendGameOver();
            }.bind(this));
        }
    },
    checkSuccess: function (arbiter, space) {
        if (arbiter.b.color == this._meteoriteColor && !this._collisionDetected) {
            this._collisionDetected = true;
            space.addPostStepCallback(function() {
                this.winScore();
            }.bind(this));
        }
        return true;
    },
    addEarth: function () {
        this._earth = new Earth();
        this._earth.setPosition(util.center.x, util.center.y);
        this.addChild(this._earth, 2);
    },
    generateGuard: function (i) {
        if (this._obstacle) {
            var lastObstacle = this._obstacle;
            lastObstacle.runAction(cc.sequence([
                cc.scaleTo(0.3, 0.1).easing(cc.easeBackIn()),
                cc.callFunc(function () {
                    lastObstacle.removeFromParent(true);
                })
            ]));
        }
        this._obstacle = Obstacle.get(i);
        this._obstacle.setPosition(util.center);
        this._obstacle.setScale(0.1);
        this.addChild(this._obstacle, 1);

        this._obstacle.runAction(cc.scaleTo(0.3, 1).easing(cc.easeBackOut()));

        this._collisionDetected = false;

        this.scheduleOnce(this.showMeteoriteTip, 1.5);
    },
    showMeteoriteTip: function () {
        var x = cc.pDistance(util.center, cc.p(0, 0)),
            p = cc.p(util.center.x + x, util.center.y),
            pv = util.p2$v(p),
            degree = cc.degreesToRadians(_.random(0, 359)),
            pn = pv.rotate(degree, util.p2$v(util.center));
        if (this._laser) {
            this._laser.removeFromParent(true);
            this._laser = null;
        }
        this._meteoritePoint = util.$v2p(pn);
        this._meteoriteColor = _.sample(this._obstacle._colors);
        this._laser = new Laser(this._meteoritePoint, this._meteoriteColor);
        this.addChild(this._laser);

        this.scheduleOnce(function () {
            this.launchMeteorite();
        }.bind(this), this.getLaunchMeteoriteTimeout());
    },
    launchMeteorite: function () {
        if (this._meteorite) {
            this._meteorite.removeFromParent(true);
            this._meteorite = null;
        }
        this._meteorite = new Meteorite(this._meteoriteColor);
        this._meteorite.setPosition(this._meteoritePoint);
        this.addChild(this._meteorite, 50);
        
        this._meteorite.launch(this.getMeteoriteTimeout());
    },
    getMeteoriteTimeout: function () {
        var percent = util.score / 30;
        var m = Math.sin(percent * Math.PI / 2);
        return 1.5 - 1.2 * m;
    },
    getLaunchMeteoriteTimeout: function () {
        return this.getMeteoriteTimeout();
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

        this._meteorite.inactivate();
        this._earth.setVisible(false);

        this.explode(event.getUserData());
        this.earthQuake();
    },
    winScore: function () {
        var point = this._meteorite.getPosition(),
            star = new Star(point);
        this.addChild(star, 100);

        cc.eventManager.dispatchCustomEvent(util.EVENT_WIN_SCORE);

        this._meteorite.inactivate();

        this.scheduleOnce(function () {
            this.generateGuard();
        }.bind(this), 0.3);
    },
    getRadianOfPoints:function (beginLineA, endLineA, beginLineB, endLineB) {
        var a = endLineA.x - beginLineA.x;
        var b = endLineA.y - beginLineA.y;
        var c = endLineB.x - beginLineB.x;
        var d = endLineB.y - beginLineB.y;

        var atanA = Math.atan2(a, b);
        var atanB = Math.atan2(c, d);

        var angle = cc.radiansToDegrees(atanA - atanB);
        if (angle > 180) {
            angle -= 360;
        } else if (angle < -180) {
            angle += 360;
        }
        return angle;
    },
    getDeltaByRadian: function (angle) {
        return (angle < 0 ? 1 : -1) * this._rotateSpeed;
    }
});