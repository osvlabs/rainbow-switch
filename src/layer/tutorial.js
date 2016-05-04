var GameTutorialLayer = cc.LayerColor.extend({
    STEP_LASER: 'laser',
    STEP_ROTATE: 'rotate',
    STEP_EXPLODE: 'explode',
    STEP_BEST_SCORE: 'best_score',
    nextButton: null,
    label: null,
    step: null,
    ctor: function () {
        this._super(util.COLOR_TRANSPARENT_BLACK);
    },
    onEnter: function () {
        this._super();
        util.tutorial = this;

        var next = new ScaleSprite(res.next, null, this.next.bind(this));
        next.setPosition(util.center.x, util.center.y * 0.5);
        next.setVisible(false);
        this.addChild(next);
        this.nextButton = next;

        var label = util.label('');
        label.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        label.setPosition(util.center.x, util.center.y * 1.25);
        label.setVisible(false);
        this.addChild(label);
        this.label = label;
    },
    tell: function (step) {
        this.setVisible(true);
        this.step = step;
        this.nextButton.setVisible(true);
        this.label.setVisible(true);
    },
    tellLaser: function () {
        this.tell(this.STEP_LASER);
        this.label.setString('Laser indicates direction \nand color of the meteorites.');
    },
    tellRotate: function () {
        this.tell(this.STEP_ROTATE);
        this.label.setString('Swipe on the screen \nto rotate the guard.');
    },
    tellExplode: function () {

    },
    tellBestScore: function () {

    },
    next: function () {
        this.label.setVisible(false);
        this.nextButton.setVisible(false);

        if (this.step == this.STEP_LASER) {
            this.tellRotate();
        } else if (this.step == this.STEP_ROTATE) {
            this.setVisible(false);
        }
    }
});