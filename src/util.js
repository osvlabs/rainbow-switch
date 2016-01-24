var util = {
    COLOR_DARK: cc.color(51, 51, 51),

    center: null,
    init: function () {
        var size = cc.winSize;
        this.center = cc.p(size.width * 0.5, size.height * 0.5);
    }
};