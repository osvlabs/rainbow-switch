var ScoreLayer = BaseLayer.extend({
    scoreLabel: null,
    bestScoreLabel: null,
    ctor: function () {
        this._super();

        var node = new cc.Node();
        node.setPosition(util.center.x, cc.winSize.height * 0.75);
        this.addChild(node);

        var score = util.label('Score', 40);
        score.setPositionY(120);
        score.setFontFillColor(util.COLOR_GRAY);
        node.addChild(score);

        this.scoreLabel = util.label('0', 120);
        this.scoreLabel.setPositionY(40);
        node.addChild(this.scoreLabel);

        score = util.label('Best score', 25);
        score.setPositionY(-70);
        score.setFontFillColor(util.COLOR_GRAY);
        node.addChild(score);

        this.bestScoreLabel = util.label('0', 60);
        this.bestScoreLabel.setPositionY(-120);
        node.addChild(this.bestScoreLabel);
    },
    onEnter: function () {
        this._super();

        this.updateScore();
    },
    updateScore: function () {
        this.scoreLabel.setString(util.score);
        this.bestScoreLabel.setString(util.config(util.CONFIG_BEST_SCORE));
    },
    moveIn: function () {
        this.updateScore();

        this._super();
    }
});