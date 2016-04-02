var BgLayer = cc.LayerColor.extend({
    ctor: function () {
        this._super(cc.color.BLACK);

        var particle = new cc.ParticleSystem(res.universe);
        this.addChild(particle);
    }
});