var Ball = cc.Node.extend({
    label: null,
    ctor: function () {
        this._super();

        this.setAnchorPoint(0.5, 0.5);

        this.label = util.icon(util.ICON_CIRCLE, 35);
        this.label.setColor(cc.color.WHITE);
        this.addChild(this.label);
    }
});