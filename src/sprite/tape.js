var Tape = cc.DrawNode.extend({
    _length: 10,
    onEnter: function () {
        this._super();
        this.setAnchorPoint(0.5, 0.5);

        var size = cc.size(cc.winSize.width, this._length * 3);
        this.setContentSize(size);

        var length = this._length,
            count = size.width / length;
        for (var i = 0; i < 3; i++) {
            var x = i % 2 ? length : 0,
                y = i * length;
            for (var j = 0; j < count; j += 2) {
                this.drawRect(cc.p(x, y), cc.p(x + length, y + length), cc.color.WHITE, 0, cc.color.WHITE);
                x += length * 2;
            }
        }

        var pos = this.getPosition();
        this._shape = new cp.BoxShape2(util.space.staticBody, cp.bb(
            pos.x - size.width / 2,
            pos.y - 1,
            pos.x + size.width / 2,
            pos.y + 1));
        this._shape.setSensor(true);
        this._shape.setCollisionType(util.COLLISION_FINISH_LINE);
        util.space.addShape(this._shape);
    }
});