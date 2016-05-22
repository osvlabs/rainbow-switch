var AboutLayer = cc.Layer.extend({
    startPoint: null,
    popup: null,
    hideListener: null,
    ctor: function() {
        this._super();
        var size = cc.winSize;

        var popup = new cc.Node();
        popup.attr({
            width: 480,
            height: 640,
            x: util.center.x,
            y: util.center.y,
            anchorX: 0.5,
            anchorY: 0.5
        });
        this.addChild(popup);
        this.popup = popup;

        var bg = new cc.DrawNode();
        var radius = 20;
        bg.drawDots(
            [
                cc.p(radius, radius),
                cc.p(popup.width - radius, radius),
                cc.p(radius, popup.height - radius),
                cc.p(popup.width - radius, popup.height - radius)
            ],
            radius,
            util.COLOR_BLUE
        );
        bg.drawRect(
            cc.p(radius, 0),
            cc.p(popup.width - radius, popup.height),
            util.COLOR_BLUE,
            0,
            util.COLOR_BLUE
        );
        bg.drawRect(
            cc.p(0, radius),
            cc.p(popup.width, popup.height - radius),
            util.COLOR_BLUE,
            0,
            util.COLOR_BLUE
        );
        popup.addChild(bg);

        this.startPoint = cc.p(util.center.x, -popup.height * 0.5);

        var sprite = new cc.Sprite('#rh.png');
        sprite.attr({
            x: popup.width / 2,
            y: popup.height - 120,
            scale: 0.8
        });
        popup.addChild(sprite);

        sprite = new ScaleSprite('#how_to_play.png', null, this.howToPlay.bind(this));
        sprite.setPosition(popup.width / 2, 360);
        popup.addChild(sprite);

        sprite = new ScaleSprite('#more_game.png', null, this.moreGame.bind(this));
        sprite.setPosition(popup.width / 2, 280);
        popup.addChild(sprite);

        sprite = new ScaleSprite('#feedback.png', null, this.feedback.bind(this));
        sprite.setPosition(popup.width / 2, 200);
        popup.addChild(sprite);
        
        var label = util.label('Version: ' + util.version, 30);
        label.setPosition(popup.width / 2, 80);
        popup.addChild(label);

        this.hideListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                if ( !cc.rectContainsPoint(target.popup.getBoundingBox(), pos) &&
                    cc.rectContainsPoint(target.getBoundingBox(), pos))
                {
                    target.hide();
                }
                return true;
            }
        });
    },
    show: function() {
        this.popup.setPosition(this.startPoint);
        cc.eventManager.addListener(this.hideListener, this);
        cc.director.getRunningScene().addChild(this);
        this.popup.runAction(new cc.MoveTo(0.3, util.center).easing(cc.easeBackOut()));
    },
    hide: function() {
        this.popup.runAction(new cc.MoveTo(0.3, this.startPoint).easing(cc.easeBackIn()));
        this.scheduleOnce(function () {
            cc.eventManager.removeListener(this.hideListener);
            this.removeFromParent(true);
        }.bind(this), 0.3);
    },
    howToPlay: function () {
        this.hide();
        this.scheduleOnce(function () {
            util.config(util.CONFIG_TUTORIAL, null);
            cc.eventManager.dispatchCustomEvent(util.EVENT_TUTORIAL_PLAY);
        }.bind(this), 0.25);
    },
    moreGame: function () {
        if (cc.sys.isNative) {
            if (cc.sys.os == cc.sys.OS_IOS) {
                // jsb.reflection.callStaticMethod("AppController", "showMoreGame");
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                // TODO: add android support
            }
        } else {
            window.open('http://wuruihong.com');
        }
    },
    feedback: function () {

    }
});