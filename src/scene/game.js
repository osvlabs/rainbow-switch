var GameScene = cc.Scene.extend({
    homeLayer: null,
    btnLayer: null,
    gameLayer: null,
    uiLayer: null,
    scoreLayer: null,
    gameOverShapes: null,
    ctor: function () {
        this._super();

        this.gameOverShapes = [];
        this.initPhysics();
    },
    initPhysics: function () {
        util.space = new cp.Space();
        util.space.gravity = cp.v(0, 0);

        util.space.setDefaultCollisionHandler(function (arb, space) {
            //cc.log(arb);
            return true;
        }, null, null, null);
    },
    onEnter: function () {
        this._super();

        this.addChild(new BgLayer());
    },
    onEnterTransitionDidFinish: function () {
        this._super();

        this.scheduleUpdate();

        this.homeLayer = new HomeLayer();
        this.addChild(this.homeLayer);

        this.btnLayer = new BtnLayer();
        this.addChild(this.btnLayer);

        this.scoreLayer = new ScoreLayer();
        this.addChild(this.scoreLayer);
        this.scoreLayer.setPosition(0, this.scoreLayer.fromY);

        cc.eventManager.addListener(cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: util.EVENT_PLAY,
            callback: this.play.bind(this)
        }), this);

        cc.eventManager.addListener(cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: util.EVENT_GAME_OVER,
            callback: this.gameOver.bind(this)
        }), this);
    },
    update: function (dt) {
        this._super(dt);
        util.space.step(dt);
    },
    play: function () {
        this.homeLayer.moveOut();
        this.btnLayer.moveOut();
        this.scoreLayer.moveOut();

        this.scheduleOnce(function () {
            this.gameLayer = new GameLayer();
            this.addChild(this.gameLayer);

            this.uiLayer = new GameUILayer();
            this.addChild(this.uiLayer);
        }, util.LAYER_MOVE_TIME);
    },
    gameOver: function (event) {
        this.flash();
        this.setupGameOverPhysics();

        this.scheduleOnce(function () {
            this.gameLayer.runAction(cc.fadeOut(0.4));
            this.uiLayer.runAction(cc.fadeOut(0.4));
        }.bind(this), 1.5);

        this.scheduleOnce(function () {
            this.removeGameOverPhysics();

            this.gameLayer.removeFromParent(true);
            this.gameLayer = null;

            this.uiLayer.removeFromParent(true);
            this.uiLayer = null;

            this.scoreLayer.moveIn();
            this.btnLayer.moveIn();
        }.bind(this), 2);
    },
    flash: function () {
        var layer = new cc.LayerColor(cc.color.WHITE);
        this.addChild(layer);

        layer.setPosition(cc.p(0, 0));
        layer.runAction(cc.fadeOut(1).easing(cc.easeSineOut()));
        this.scheduleOnce(function () {
            layer.removeFromParent(true);
        }, 1);
    },
    setupGameOverPhysics: function () {
        var staticBody = util.space.staticBody,
            width = cc.winSize.width,
            height = cc.winSize.height,
            delta = - this.gameLayer.getPositionY(),
            thick = -10,
            tl = cp.v(thick, height - thick + delta),
            tr = cp.v(width - thick, height - thick + delta),
            bl = cp.v(thick, thick + delta),
            br = cp.v(width - thick, thick + delta);
        var walls = [
            new cp.SegmentShape(staticBody, bl, br, Math.abs(thick)), // Bottom
            new cp.SegmentShape(staticBody, tl, tr, Math.abs(thick)), // Top
            new cp.SegmentShape(staticBody, bl, tl, Math.abs(thick)), // Left
            new cp.SegmentShape(staticBody, br, tr, Math.abs(thick))  // Right
        ];
        for (var i = 0; i < walls.length; i++) {
            var shape = walls[i];
            shape.setCollisionType(util.COLLISION_GAME_OVER_WALL);
            shape.setElasticity(1);
            util.space.addStaticShape(shape);
            this.gameOverShapes.push(shape);
        }
    },
    removeGameOverPhysics: function () {
        _.forEach(this.gameOverShapes, function (v, k) {
            util.space.removeShape(v);
        });
        this.gameOverShapes.length = 0;
    }
});