var SplashLayer = cc.LayerColor.extend({
    sprite: null,
    ctor: function () {
        this._super(cc.color.BLACK);
        var size = cc.winSize;

        var sprite = new cc.Sprite('#rh.png');
        sprite.attr({
            x: util.center.x,
            y: size.height * 0.5,
            scale: 0.1
        });
        this.addChild(sprite);
        this.sprite = sprite;

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
            new cc.DelayTime(2),
            new cc.CallFunc(function(){
                cc.director.runScene(new cc.TransitionFlipX(0.3, new GameScene()));
            })
        ]));
    }
});

