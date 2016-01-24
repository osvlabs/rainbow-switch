var Ball = cc.Node.extend({
    label: null,
    ctor: function () {
        this._super();

        this.setAnchorPoint(0.5, 0.5);

        this.label = util.icon(util.ICON_CIRCLE, 35);
        this.label.setColor(cc.color.WHITE);
        this.addChild(this.label);
    },
    onEnter: function () {
        this._super();

        cc.eventManager.addListener(new cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: util.EVENT_JUMP,
            callback: this.jump.bind(this)
        }), this);

        cc.eventManager.addListener(new cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: util.EVENT_JUMP_END,
            callback: this.cancelJump.bind(this)
        }), this);
    },
    jump: function (event) {
        this.runAction(cc.sequence([
            cc.moveBy(0.2, 0, 50).easing(cc.easeSineIn()),
            cc.moveBy(0.2, 0, -50).easing(cc.easeSineOut())
        ]));
    },
    cancelJump: function (event) {
        this.stopAllActions();
    }
});