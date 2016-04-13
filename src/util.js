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

    EXPLODE_COLORS: [],
    COLORS: [],

    // Events
    EVENT_PLAY: 'play',
    EVENT_ROTATE: 'rotate',
    EVENT_GAME_OVER: 'game_over',
    EVENT_WIN_SCORE: 'win_score',
    EVENT_CHANGE_BALL: 'change_ball_color',

    // Collisions
    COLLISION_BALL: 1,
    COLLISION_GAME_OVER_WALL: 10,
    COLLISION_DEBRIS: 20,
    COLLISION_OBSTACLE: 30,
    COLLISION_OBSTACLE_CENTER: 40,
    COLLISION_STAR: 50,
    COLLISION_SWITCH: 60,
    COLLISION_EARTH: 200,
    COLLISION_METEORITE: 1000,

    // config
    CONFIG_DEBUG: 'debug',
    CONFIG_BEST_SCORE: 'best_score',

    // Constants
    LAYER_MOVE_TIME: 0.5,

    // Others
    center: null,
    space: null,
    ballColor: null,
    score: 0,
    configPath: 'config.json',
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

        this.EXPLODE_COLORS = [
            cc.color.WHITE,
            cc.color.RED,
            cc.color.ORANGE,
            cc.color.YELLOW,
            cc.color.BLUE,
            cc.color.GREEN,
            cc.color.MAGENTA
        ];
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
        this.addChild(this._debugNode, 9999);
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
    $v2p: function (v) {
        return cc.p(
            v.elements[0],
            v.elements[1]
        );
    },
    p2$v: function (p) {
        return $V([
            p.x,
            p.y
        ]);
    },
    rotate$v2ps: function (vs, degree, origin) {
        var result = [];
        _.forEach(vs, function (v, k) {
            result.push(util.$v2p(v.rotate(degree, origin)));
        });
        return result;
    },
    shadowLabel: function (text, size) {
        var label = new cc.LabelTTF(text, null, size);
        label.setFontFillColor(cc.color.WHITE);

        var offset = cc.size(5, -5);
        if (cc.sys.isNative) {
            offset = cc.size(2, -2);
        }
        label.enableShadow(cc.color.BLACK, offset, 10);

        return label;
    },
    config: function (k, v) {
        if (cc.sys.isNative) {
            var dir = jsb.fileUtils.getWritablePath();
            var path = dir + '/' + this.configPath;
            var jsonString = '{}';
            if (jsb.fileUtils.isFileExist(path)) {
                jsonString = jsb.fileUtils.getStringFromFile(path);
            }
            var config = JSON.parse(jsonString);
            if (v === undefined) {
                return config[k];
            }
            config[k] = v;
            jsb.fileUtils.writeStringToFile(JSON.stringify(config), path);
        } else {
            if (v === undefined) {
                v = localStorage.getItem(k);
                return JSON.parse(v);
            }
            v = JSON.stringify(v);
            localStorage.setItem(k, v);
        }
    }
};