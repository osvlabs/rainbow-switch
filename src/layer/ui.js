var GameUILayer = cc.Layer.extend({
    _scoreLabel: null,
    _pauseBtn: null,
    ctor: function () {
        this._super();

        this._scoreLabel = util.label('' + util.score, 60);
        this._scoreLabel.setColor(util.COLOR_SILVER);
        this._scoreLabel.setPosition(50, cc.winSize.height - 50);
        this.addChild(this._scoreLabel);

        this._pauseBtn = new ScaleSprite(res.pause, null, function () {
            if (util.tutorial) {
                return;
            }
            cc.eventManager.dispatchCustomEvent(util.EVENT_PAUSE);
        }.bind(this));
        this._pauseBtn.setPosition(cc.winSize.width - 50, cc.winSize.height - 50);
        this.addChild(this._pauseBtn);
    },
    onEnter: function () {
        this._super();
        this.setScore(util.score);

        cc.eventManager.addListener(cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: util.EVENT_WIN_SCORE,
            callback: this.winScore.bind(this)
        }), this);

        cc.eventManager.addListener(cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: util.EVENT_GAME_OVER,
            callback: function () {
                this._pauseBtn.setVisible(false);
            }.bind(this)
        }), this);
    },
    setScore: function (v) {
        util.score = v;
        this._scoreLabel.setString(_.toString(v));
    },
    winScore: function () {
        util.score++;
        this.setScore(util.score);

        var best = util.config(util.CONFIG_BEST_SCORE);
        if (!best || util.score > best) {
            util.config(util.CONFIG_BEST_SCORE, util.score);
        }
    }
});