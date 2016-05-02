var TopLayer = BaseLayer.extend({
    music: null,
    ctor: function () {
        this._super();

        var about = new ScaleSprite(res.about, null, this.showAboutPopup.bind(this));
        var size = about.getContentSize();
        about.setPosition(cc.winSize.width - size.width / 2 - 25, cc.winSize.height - size.height / 2 - 25);
        this.addChild(about);

        var music = new ScaleSprite(res.music, null, this.toggleAudio.bind(this));
        size = about.getContentSize();
        music.setPosition(size.width / 2 + 25, cc.winSize.height - size.height / 2 - 25);
        this.addChild(music);
        this.music = music;
    },
    onEnter: function () {
        this._super();
        this.updateAudioIcon();
    },
    showAboutPopup: function () {
        var aboutLayer = new AboutLayer();
        aboutLayer.show();
    },
    toggleAudio: function () {
        util.toggleAudio();
        this.updateAudioIcon();
    },
    updateAudioIcon: function () {
        this.music.setOpacity(util.audioEnabled() ? 255 : 127);
    }
});