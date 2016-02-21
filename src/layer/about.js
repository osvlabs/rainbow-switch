var AboutLayer = cc.LayerColor.extend({
    startPoint: null,
    popup: null,
    hideListener: null,
    ctor: function() {
        this._super(rh.dimColor);
        var size = cc.winSize;

        var popup = new cc.Node();
        popup.attr({
            width: 480,
            height: size.height * 0.75,
            x: rh.center.x,
            y: rh.center.y,
            anchorX: 0.5,
            anchorY: 0.5
        });
        this.addChild(popup);
        this.popup = popup;

        var hCenter = popup.width / 2,
            vCenter = popup.height / 2;
        var bg = new cc.Scale9Sprite(res.popup, cc.rect(0, 0, 71, 71), cc.rect(35, 35, 1, 1));
        bg.attr({
            width: popup.width,
            height: popup.height,
            x: hCenter,
            y: vCenter
        });
        popup.addChild(bg);

        this.startPoint = cc.p(rh.center.x, -popup.height * 0.5);

        var label = rh.label('开发商');
        label.attr({
            x: hCenter,
            y: popup.height - 45
        });
        popup.addChild(label);

        var sprite = new cc.Sprite('#logoMobile.png');
        sprite.attr({
            x: hCenter,
            y: popup.height - 170,
            scale: 0.6
        });
        popup.addChild(sprite);

        sprite = rh.popupButton('关注我们', res.wechat);
        sprite.attr({
            x: 150,
            y: popup.height - 300
        });
        popup.addChild(sprite);

        sprite = rh.popupButton('评价', res.star);
        sprite.attr({
            x: popup.width - 120,
            y: popup.height - 300
        });
        popup.addChild(sprite);

        sprite = rh.popupButton('更多游戏', res.game);
        sprite.attr({
            x: 150,
            y: popup.height - 390
        });
        popup.addChild(sprite);

        sprite = rh.popupButton('分享', res.share2);
        sprite.attr({
            x: popup.width - 120,
            y: popup.height - 390
        });
        popup.addChild(sprite);

        this.hideListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                if ( cc.rectContainsPoint(target.popup.getBoundingBox(), pos)) {
                    return false;
                }
                if ( cc.rectContainsPoint(target.getBoundingBox(), pos)) {
                    target.hide();
                    return true;
                }
                return false;
            }
        });
    },
    show: function() {
        var size = cc.winSize;
        this.popup.setPosition(this.startPoint);
        cc.eventManager.addListener(this.hideListener, this);
        cc.director.getRunningScene().addChild(this);
        this.popup.runAction(new cc.MoveTo(0.3, rh.center).easing(cc.easeBackOut()));
    },
    hide: function() {
        this.popup.runAction(new cc.MoveTo(0.3, this.startPoint).easing(cc.easeBackIn()));
        this.scheduleOnce(function () {
            cc.eventManager.removeListener(this.hideListener);
            this.removeFromParent(true);
        }, 0.3);
    }
});