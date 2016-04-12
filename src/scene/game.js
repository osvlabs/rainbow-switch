var GameScene = cc.Scene.extend({
    homeLayer: null,
    btnLayer: null,
    gameLayer: null,
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

        this.scheduleUpdate();

        this.addChild(new BgLayer());

        this.homeLayer = new HomeLayer();
        this.addChild(this.homeLayer);

        // this.gameLayer = new GameLayer();
        // this.addChild(this.gameLayer);

        // var uiLayer = new GameUILayer();
        // this.addChild(uiLayer);

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
    gameOver: function (event) {
        this.flash();
        this.setupGameOverPhysics();
        this.scheduleOnce(function () {
            this.removeGameOverPhysics();
            // TODO: Show game over layer
        }.bind(this), 1);
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
    }
});