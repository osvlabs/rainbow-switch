var Star = cc.Node.extend({
    _shape: null,
    _label: null,
    ctor: function () {
        this._super();

        this._label = util.icon(util.ICON_STAR);
        this.addChild(this._label);
    },
    onEnter: function () {
        this._super();

        var pos = this.getPosition(),
            size = this._label.getFontSize();
        this._shape = new cp.BoxShape2(util.space.staticBody, cp.bb(
            pos.x - size / 2,
            pos.y - size / 2 + 5,
            pos.x + size / 2,
            pos.y + size / 2 + 5));
        this._shape.setSensor(true);
        this._shape.setCollisionType(util.COLLISION_STAR);
        this._shape.object = this;
        util.space.addShape(this._shape);

        this.runAction(cc.sequence([
            cc.scaleBy(0.75, 1.25).easing(cc.easeSineIn()),
            cc.scaleBy(0.75, 0.8).easing(cc.easeSineOut())
        ]).repeatForever());

        this.schedule(function () {
            this.runAction(cc.sequence([
                cc.scaleBy(0.3, 0.1, 1).easing(cc.easeBackIn()),
                cc.scaleBy(0.3, 10, 1).easing(cc.easeBackOut())
            ]));
        }, 5);
    },
    winScore: function () {
        this.runAction(cc.sequence([
            cc.spawn([
                cc.fadeOut(0.2),
                cc.callFunc(function () {
                    this.addChild(new cc.ParticleSystem(res.star_explode));
                }.bind(this))
            ]),
            cc.callFunc(function () {
                this.removeFromParent(true);
                util.space.removeShape(this._shape);
            }.bind(this))
        ]));
    }
});