var Meteorite = PhysicsSprite.extend({
    image: null,
    mColor: null,
    ctor: function () {
        this._super();

        var scale = _.random(0.6, 1.2),
            images = [{
                name: 'yellow',
                color: util.COLOR_YELLOW
            }, {
                name: 'fuchsia',
                color: util.COLOR_FUCHSIA
            }, {
                name: 'blue',
                color: util.COLOR_BLUE
            }, {
                name: 'lime',
                color: util.COLOR_LIME
            }],
            imageType = _.sample(images);
        this.image = new cc.Sprite(res['meteorite_' + imageType.name]);
        this.image.setScale(scale);
        this.addChild(this.image);

        this.mColor = imageType.color;

        var _size = this.image.getContentSize(),
            size = cc.size(_size.width * scale, _size.height * scale);
        var body = new cp.Body(1, cp.momentForCircle(1, 0, size.width / 2, cp.vzero));
        body.userData = this;
        util.space.addBody(body);

        var shape = new cp.CircleShape(body, size.width / 2, cp.vzero);
        shape.setCollisionType(util.COLLISION_METEORITE);
        shape.setSensor(true);
        util.space.addShape(shape);

        this.setBody(body);
        this.setIgnoreBodyRotation(true);
    },
    onEnter: function () {
        this._super();

        this.image.runAction(cc.rotateBy(2, 360).repeatForever());
    }
});