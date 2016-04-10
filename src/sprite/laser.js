var Laser = cc.DrawNode.extend({
    ctor: function (point, color) {
        this._super();

        this.drawSegment(util.center, point, 3, color);
    },
    onEnterTransitionDidFinish: function () {
        this._super();

        this.runAction(cc.sequence([
            cc.blink(0.2, 1),
            cc.callFunc(function () {
                this.setVisible(false);
            }.bind(this))
        ]));
    }
});