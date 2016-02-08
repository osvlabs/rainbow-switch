var Star = cc.Node.extend({
    ctor: function () {
        this._super();

        var label = util.icon(util.ICON_STAR);
        this.addChild(label);
    },
    onEnter: function () {
        this._super();

        this.runAction(cc.sequence([
            cc.scaleTo(0.75, 1.25).easing(cc.easeSineIn()),
            cc.scaleTo(0.75, 1).easing(cc.easeSineOut())
        ]).repeatForever());
    }
});