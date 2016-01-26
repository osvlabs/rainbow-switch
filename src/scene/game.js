var GameScene = cc.Scene.extend({
    layer: null,
    earth: null,
    ctor: function () {
        this._super();

        this.initPhysics();
    },
    initPhysics: function () {
        var space = new cp.Space();
        space.gravity = cp.v(0, -1000);

        this.earth = new cp.SegmentShape(space.staticBody, cp.v(0, 200),
            cp.v(cc.winSize.width, 200), 0);
        space.addStaticShape(this.earth);

        space.setDefaultCollisionHandler(function (arb, space) {
            //cc.log(arb);
            return true;
        }, null, null, null);

        util.space = space;
    },
    onEnter: function () {
        this._super();

        this.scheduleUpdate();

        this.layer = new GameLayer();
        this.addChild(this.layer);

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
        this.setupPhysics();
        this.layer.explode(event.getUserData());
    },
    flash: function () {
        var layer = new cc.LayerColor(cc.color.WHITE);
        layer.setPosition(cc.p(0, 0));
        this.addChild(layer);
        layer.runAction(cc.fadeOut(1).easing(cc.easeSineOut()));
    },
    setupPhysics: function () {
        util.space.gravity = cp.vzero;
        util.space.removeStaticShape(this.earth);

        var staticBody = util.space.staticBody,
            width = cc.winSize.width,
            height = cc.winSize.height,
            delta = - this.layer.getPositionY(),
            thick = 0,
            tl = cp.v(thick, height - thick + delta),
            tr = cp.v(width - thick, height - thick + delta),
            bl = cp.v(thick, thick + delta),
            br = cp.v(width - thick, thick + delta);
        var walls = [
            new cp.SegmentShape(staticBody, bl, br, 0), // Bottom
            new cp.SegmentShape(staticBody, tl, tr, 0), // Top
            new cp.SegmentShape(staticBody, bl, tl, 0), // Left
            new cp.SegmentShape(staticBody, br, tr, 0)  // Right
        ];
        for (var i = 0; i < walls.length; i++) {
            var shape = walls[i];
            shape.setCollisionType(util.COLLISION_GAME_OVER_WALL);
            shape.setElasticity(1);
            util.space.addStaticShape(shape);
        }
    }
});