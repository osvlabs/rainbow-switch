var Star = cc.Node.extend({
    ctor: function (pos) {
        this._super();
        
        this.setPosition(pos);
    },
    onEnter: function () {
        this._super();
        
        this.addChild(new cc.ParticleSystem(res.star_explode));

        var label = util.label('+1');
        label.enableShadow(util.COLOR_DARK, cc.size(5, -5), 5);
        this.addChild(label);

        label.runAction(cc.sequence([
            cc.spawn([
                cc.moveBy(0.8, 0, 40).easing(cc.easeSineIn()),
                cc.fadeOut(0.8).easing(cc.easeSineIn())
            ]),
            cc.callFunc(function () {
                this.removeFromParent(true);
            }.bind(this))
        ]));
    }
});