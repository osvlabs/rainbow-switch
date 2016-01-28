var util = {
    // Colors
    COLOR_DARK: cc.color(51, 51, 51),

    COLOR_NAVY: cc.color('#001f3f'),
    COLOR_BLUE: cc.color('#0074D9'),
    COLOR_AQUA: cc.color('#7FDBFF'),
    COLOR_TEAL: cc.color('#39CCCC'),
    COLOR_OLIVE: cc.color('#3D9970'),
    COLOR_GREEN: cc.color('#2ECC40'),
    COLOR_LIME: cc.color('#01FF70'),
    COLOR_YELLOW: cc.color('#FFDC00'),
    COLOR_ORANGE: cc.color('#FF851B'),
    COLOR_RED: cc.color('#FF4136'),
    COLOR_MAROON: cc.color('#85144b'),
    COLOR_FUCHSIA: cc.color('#F012BE'),
    COLOR_PURPLE: cc.color('#B10DC9'),

    COLOR_BLACK: cc.color('#111111'),
    COLOR_GRAY: cc.color('#AAAAAA'),
    COLOR_SILVER: cc.color('#DDDDDD'),

    EXPLODE_COLORS: [
        cc.color.WHITE,
        cc.color.RED,
        cc.color.ORANGE,
        cc.color.YELLOW,
        cc.color.BLUE,
        cc.color.GREEN,
        cc.color.MAGENTA
    ],
    SILVER_COLORS: [
        'COLOR_DARK',
        'COLOR_BLACK',
        'COLOR_GRAY',
        'COLOR_SILVER'
    ],
    COLORS: [],

    // Icons
    ICON_HAND_O_UP: '',
    ICON_CIRCLE: '',
    ICON_PLAY: '',

    // Events
    EVENT_JUMP: 'jump',
    EVENT_MOVE_GAME_LAYER: 'move_game_layer',
    EVENT_GAME_OVER: 'game_over',

    // Collisions
    COLLISION_BALL: 'ball',
    COLLISION_GAME_OVER_WALL: 'game_over_wall',
    COLLISION_DEBRIS: 'debris',

    // Others
    center: null,
    space: null,
    init: function () {
        var size = cc.winSize;
        this.center = cc.p(size.width * 0.5, size.height * 0.5);

        this.COLORS.length = 0;
        for (var k in this) {
            if (this.hasOwnProperty(k) && k.indexOf('COLOR_') == 0 && !_.includes(this.SILVER_COLORS, k)) {
                this.COLORS.push(this[k]);
            }
        }
    },
    icon: function (text, size) {
        if (size === undefined) {
            size = 50;
        }
        return new cc.LabelTTF(text, 'FontAwesome', size);
    },
    animate: function (prefix, count, interval) {
        var frames = [];
        for (var i = 1; i <= count; i++) {
            var frame = cc.spriteFrameCache.getSpriteFrame(prefix + i + '.png');
            frames.push(frame);
        }
        var ani = new cc.Animation(frames, interval);
        return cc.animate(ani);
    },
    addDebugNode: function () {
        this._debugNode = new cc.PhysicsDebugNode(util.space);
        this._debugNode.visible = true;
        this.addChild(this._debugNode);
    },
    logColors: function (colors) {
        var result = [];
        _.forEach(colors, function (v, k) {
            result.push(cc.colorToHex(v));
        });
        cc.log(result);

        return result;
    }
};