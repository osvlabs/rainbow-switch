var Laser = cc.DrawNode.extend({
    ctor: function (point, color) {
        this._super();

        this.drawSegment(util.center, point, 3, color);
    },
    onEnterTransitionDidFinish: function () {
        this._super();

        var duration = util.tutorial ? 1000000 : 0.2,
            times = util.tutorial ? duration * 2 : 1;
        this.runAction(cc.sequence([
            cc.blink(duration, times),
            cc.callFunc(function () {
                this.setVisible(false);
            }.bind(this))
        ]));
    }
});