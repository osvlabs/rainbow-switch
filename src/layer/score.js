var ScoreLayer = TopLayer.extend({
    scoreLabel: null,
    bestScoreLabel: null,
    ctor: function () {
        this._super();

        var node = new cc.Node();
        node.setPosition(util.center.x, cc.winSize.height * 0.75);
        this.addChild(node);

        var score = util.label('Score', 40);
        score.setPositionY(130);
        score.setFontFillColor(util.COLOR_GRAY);
        node.addChild(score);

        this.scoreLabel = util.label('0', 130);
        this.scoreLabel.setPositionY(45);
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

        this.scheduleOnce(function () {
            if (this.scoreLabel.getString() == this.bestScoreLabel.getString()) {
                var particle = new cc.ParticleSystem(res.explode);
                particle.setPosition(util.center.x, cc.winSize.height * 0.75);
                this.addChild(particle);

                this.scheduleOnce(function () {
                    particle.runAction(cc.sequence([
                        cc.fadeOut(0.5),
                        cc.callFunc(function () {
                            particle.removeFromParent(true);
                        })
                    ]));
                }, 1.5);
            }
        }.bind(this), util.LAYER_MOVE_TIME);
    }
});