var BgLayer = cc.LayerColor.extend({
    ctor: function () {
        this._super(cc.color.BLACK);
    },
    onEnter: function () {
        this._super();

        var particle = new cc.ParticleSystem(res.universe);
        this.addChild(particle);

        var earth = new Earth();
        earth.setPosition(util.center.x, util.center.y);
        this.addChild(earth);
    }
});