var ScaleSprite = cc.Sprite.extend({
    touchListener: null,
    scaleMax: 1.4,
    scaleTime: 0.1,
    ctor: function(frameName, callback, endCallback) {
        this._super(frameName);

        this.touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                if (cc.rectContainsPoint(target.getBoundingBoxToWorld(), pos)) {
                    this.stopAllActions();
                    var scaleX = this.getScaleX(),
                        scaleY = this.getScaleY();
                    this.oldScaleX = scaleX;
                    this.oldScaleY = scaleY;
                    this.runAction(
                        cc.scaleTo(this.scaleTime, scaleX * this.scaleMax, scaleY * this.scaleMax)
                            .easing(cc.easeBackIn())
                    );
                    if (callback) {
                        this.scheduleOnce(callback, this.scaleTime);
                    }
                    return true;
                }
                return false;
            }.bind(this),
            onTouchEnded: function (touch, event) {
                this.stopAllActions();
                this.runAction(
                    cc.scaleTo(this.scaleTime, this.oldScaleX, this.oldScaleY).easing(cc.easeBounceOut())
                );
                if (endCallback) {
                    this.scheduleOnce(endCallback, this.scaleTime);
                }
            }.bind(this),
            onTouchCancelled: function (touch, event) {
                this.onTouchEnded(touch, event);
            }
        });
        cc.eventManager.addListener(this.touchListener, this);
    }
});