var ScoreLayer = BaseLayer.extend({
    scoreLabel: null,
    ctor: function () {
        this._super();

        this.scoreLabel = util.label('0', 50);
        this.scoreLabel.setPosition(util.center.x, cc.winSize.height * 0.75);
        this.addChild(this.scoreLabel);
    },
    onEnter: function () {
        this._super();

        this.scoreLabel.setString(util.score);
    }
});