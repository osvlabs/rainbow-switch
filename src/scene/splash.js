var SplashLayer = cc.LayerColor.extend({
    sprite: null,
    ctor: function () {
        this._super(util.COLOR_DARK);
        var size = cc.winSize;

        var sprite = new cc.Sprite(res.rh);
        sprite.attr({
            x: util.center.x,
            y: size.height * 0.5,
            scale: 0.1
        });
        this.addChild(sprite);
        this.sprite = sprite;

        var slogan = new Slogan();
        slogan.setPosition(util.center.x, size.height * 0.5 + 100);
        this.addChild(slogan);

        return true;
    },
    onEnterTransitionDidFinish: function() {
        this._super();
        this.sprite.runAction(new cc.ScaleTo(0.5, 1).easing(cc.easeBounceOut()));
    }
});

var SplashScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new SplashLayer();
        this.addChild(layer);
    },
    onEnterTransitionDidFinish: function() {
        this._super();
        this.runAction(new cc.Sequence([
            new cc.DelayTime(1.5),
            new cc.CallFunc(function(){
                cc.director.runScene(new cc.TransitionFlipX(0.3, new GameScene()));
            })
        ]));
    }
});

