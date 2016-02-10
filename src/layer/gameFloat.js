var GameFloatLayer = cc.Layer.extend({
    _scoreLabel: null,
    _score: 0,
    ctor: function () {
        this._super();

        this._scoreLabel = util.label('0', 60);
        this._scoreLabel.setColor(util.COLOR_SILVER);
        this._scoreLabel.setPosition(50, cc.winSize.height - 50);
        this.addChild(this._scoreLabel);
    },
    onEnter: function () {
        this._super();

        cc.eventManager.addListener(cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: util.EVENT_WIN_SCORE,
            callback: this.winScore.bind(this)
        }), this);
    },
    setScore: function (v) {
        this._score = v;
        this._scoreLabel.setString(_.toString(this._score));
    },
    winScore: function () {
        this.setScore(++this._score);
        cc.log(this._score);
    }
});