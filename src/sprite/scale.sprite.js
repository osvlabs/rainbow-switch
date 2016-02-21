var ScaleSprite = cc.Sprite.extend({
    touchListener: null,
    ctor: function(frameName, callback, endCallback) {
        this._super(frameName);

        var self = this;
        this.touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                if (cc.rectContainsPoint(target.getBoundingBox(), pos)) {
                    self.stopAllActions();
                    self.runAction(cc.scaleTo(0.1, 1.4).easing(cc.easeSineOut()));
                    if (callback) {
                        callback();
                    }
                    return true;
                }
                return false;
            },
            onTouchEnded: function (touch, event) {
                self.stopAllActions();
                self.runAction(cc.scaleTo(0.1, 1.0).easing(cc.easeSineIn()));
                if (endCallback) {
                    endCallback();
                }
            },
            onTouchCancelled: function (touch, event) {
                this.onTouchEnded(touch, event);
            }
        });
        cc.eventManager.addListener(this.touchListener, this);
    }
});