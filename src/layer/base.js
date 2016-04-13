var BaseLayer = cc.Layer.extend({
    fromY: 0,
    toY: 0,
    ctor: function () {
        this._super();
        this.fromY = util.center.y;
    },
    moveIn: function () {
        this.setPositionY(this.fromY);
        this.setOpacity(0);

        this.runAction(cc.spawn([
            cc.moveTo(util.LAYER_MOVE_TIME, cc.p(0, this.toY)).easing(cc.easeBounceOut()),
            cc.fadeIn(util.LAYER_MOVE_TIME).easing(cc.easeSineIn())
        ]));
    },
    moveOut: function () {
        this.runAction(cc.spawn([
            cc.moveTo(util.LAYER_MOVE_TIME, cc.p(0, this.fromY)),
            cc.fadeOut(util.LAYER_MOVE_TIME)
        ]).easing(cc.easeExponentialIn()));
    }
});