var util = {
    // Colors
    COLOR_DARK: cc.color(51, 51, 51),

    // Icons
    ICON_HAND: '',

    // Others
    center: null,
    init: function () {
        var size = cc.winSize;
        this.center = cc.p(size.width * 0.5, size.height * 0.5);
    },
    icon: function (text, size) {
        if (size === undefined) {
            size = 50;
        }
        return new cc.LabelTTF(text, 'FontAwesome', size);
    }
};