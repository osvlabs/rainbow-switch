var PhysicsSprite = cc.PhysicsSprite.extend({
    onExit: function () {
        var body = this.getBody();
        if (body) {
            body.eachShape(function (shape) {
                util.space.removeShape(shape);
            });
            util.space.removeBody(body);
        }

        this._super();
    }
});