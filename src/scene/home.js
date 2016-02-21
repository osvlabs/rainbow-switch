var HomeLayer = cc.LayerColor.extend({
    _aboutLayer: null,
    _startBtn: null,
    ctor: function(){
        this._super(util.COLOR_DARK);
        var size = cc.winSize;

        var slogan = new Slogan();
        slogan.setPosition(util.center.x, size.height - 140);
        this.addChild(slogan);

        var circles = Obstacle.create({
            type: 'Group',
            parts: [{
                type: 'Circle',
                radius: 220,
                thick: 30,
                shape: false
            }, {
                type: 'Circle',
                radius: 160,
                thick: 30,
                speed: -3,
                shape: false
            }],
            star: false,
            switch: false,
            shape: false
        });
        circles.setPosition(util.center.x, size.height * 0.6);
        this.addChild(circles);

        this._startBtn = util.iconBtn(util.ICON_PLAY, 180, this.startGame.bind(this));
        this._startBtn.setPosition(util.center.x, size.height * 0.6 - 17);
        this.addChild(this._startBtn);
    },
    onEnterTransitionDidFinish: function(){
        this._super();

        this._startBtn.runAction(cc.sequence([
            cc.scaleBy(0.5, 1.25).easing(cc.easeSineOut()),
            cc.scaleBy(0.7, 0.8).easing(cc.easeSineIn())
        ]).repeatForever());
    },
    showAbout: function() {
        this._aboutLayer = new AboutLayer();
        this._aboutLayer.show();
    },
    startGame: function() {
        cc.director.runScene(cc.TransitionFade.create(0.5, new GameScene()));
    }
});

var HomeScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        this.addChild(new HomeLayer());
    }
});

