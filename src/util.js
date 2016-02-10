var util = {
    // Colors
    COLOR_DARK: cc.color(34, 34, 34),

    COLOR_NAVY: cc.color('#001f3f'),
    COLOR_BLUE: cc.color('#1883F9'),
    COLOR_AQUA: cc.color('#7FDBFF'),
    COLOR_TEAL: cc.color('#39CCCC'),
    COLOR_OLIVE: cc.color('#3D9970'),
    COLOR_GREEN: cc.color('#2ECC40'),
    COLOR_LIME: cc.color('#01FF70'),
    COLOR_YELLOW: cc.color('#FFFC39'),
    COLOR_ORANGE: cc.color('#FF851B'),
    COLOR_RED: cc.color('#FF4136'),
    COLOR_MAROON: cc.color('#85144b'),
    COLOR_FUCHSIA: cc.color('#FB29FB'),
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
    COLORS: [],

    // Icons
    ICON_HAND_O_UP: '',
    ICON_CIRCLE: '',
    ICON_PLAY: '',
    ICON_STAR: '',

    // Events
    EVENT_JUMP: 'jump',
    EVENT_GAME_OVER: 'game_over',
    EVENT_WIN_SCORE: 'win_score',
    EVENT_CHANGE_BALL: 'change_ball_color',
    EVENT_FINISH: 'finish',

    // Collisions
    COLLISION_BALL: 'ball',
    COLLISION_GAME_OVER_WALL: 'game_over_wall',
    COLLISION_DEBRIS: 'debris',
    COLLISION_OBSTACLE: 'obstacle',
    COLLISION_STAR: 'star',
    COLLISION_SWITCH: 'switch',
    COLLISION_FINISH_LINE: 'finish_line',

    // Others
    center: null,
    space: null,
    ballColor: null,
    currentLevel: 0,
    currentIndex: 0,
    init: function () {
        var size = cc.winSize;
        this.center = cc.p(size.width * 0.5, size.height * 0.5);

        this.COLORS = [
            util.COLOR_YELLOW,
            util.COLOR_FUCHSIA,
            util.COLOR_BLUE,
            util.COLOR_LIME
        ];
        this.ballColor = this.COLOR_YELLOW;
    },
    icon: function (text, size) {
        return new cc.LabelTTF(text, 'FontAwesome', size || 50);
    },
    label: function (text, size) {
        return new cc.LabelTTF(text, 'Arial', size || 40);
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
    },
    cpVerts: function (verts) {
        var result = [];
        _.forEach(verts, function (v, k) {
            result.push(v.x);
            result.push(v.y);
        });

        return result;
    },
    currentLevels: function () {
        return this.data.levels[this.currentLevel];
    }
};