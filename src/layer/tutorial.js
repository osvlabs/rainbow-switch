var GameTutorialLayer = cc.LayerColor.extend({
    STEP_LASER: 'laser',
    STEP_ROTATE: 'rotate',
    STEP_ABSORB: 'absorb',
    nextButton: null,
    label: null,
    step: null,
    hand: null,
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
        
        var hand = new cc.Sprite(res.rotate_hand);
        hand.setPosition(util.center);
        hand.setVisible(false);
        this.addChild(hand);
        this.hand = hand;
    },
    tell: function (step) {
        this.setVisible(true);
        this.step = step;
        this.nextButton.setVisible(true);
        this.label.setVisible(true);
    },
    tellLaser: function () {
        this.tell(this.STEP_LASER);
        this.label.setPosition(util.center.x, util.center.y * 1.25);
        this.label.setString('Laser indicates direction \nand color of the meteorites.');
    },
    tellRotate: function () {
        this.tell(this.STEP_ROTATE);
        this.label.setPosition(util.center.x, util.center.y * 1.5);
        this.label.setString('Swipe on the screen \nto rotate the guard.');
        this.hand.setVisible(true);
    },
    tellAbsorb: function () {
        this.tell(this.STEP_ABSORB);
        this.label.setPosition(util.center.x, util.center.y * 1.25);
        this.label.setString('Guard is able to absorb the \nmeteorite with same color, \ngetting rid of attacking\n the Earth.');
        this.nextButton.removeFromParent();

        var go = new ScaleSprite(res.go, null, this.go.bind(this));
        go.setPosition(util.center.x, util.center.y * 0.5);
        this.addChild(go);
    },
    next: function () {
        this.label.setVisible(false);
        this.hand.setVisible(false);

        if (this.step == this.STEP_LASER) {
            this.tellRotate();
        } else if (this.step == this.STEP_ROTATE) {
            this.tellAbsorb();
        }
    },
    go: function () {
        util.tutorial = undefined;
        util.config(util.CONFIG_TUTORIAL, true);
        cc.eventManager.dispatchCustomEvent(util.EVENT_TUTORIAL_DONE);
        this.removeFromParent(true);
    }
});