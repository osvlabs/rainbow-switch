var util = new (Cocos2dJsHelper.extend({
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
    EVENT_ROTATE: 'rotate',
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

    // Constants
    LAYER_MOVE_TIME: 0.5,

    // Others
    ballColor: null,
    init: function () {
        this._super();

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
    }
}))();