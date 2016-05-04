var res = {
    rh: 'res/rh.png',
    slogan: 'res/slogan.png',
    play: 'res/play.png',
    star: 'res/particle_star.plist',
    universe: 'res/particle_universe.plist',
    explode: 'res/particle_explode.plist',
    earth: 'res/earth.png',
    about: 'res/about.png',
    mail: 'res/mail.png',
    music: 'res/music.png',
    share: 'res/share.png',
    next: 'res/next.png',
    how_to_play: 'res/how_to_play.png',
    feedback: 'res/feedback.png',
    more_game: 'res/more_game.png',
    meteorite_blue: 'res/meteorite_blue.png',
    meteorite_yellow: 'res/meteorite_yellow.png',
    meteorite_lime: 'res/meteorite_lime.png',
    meteorite_fuchsia: 'res/meteorite_fuchsia.png',

    // audio
    audio_fail: 'res/fail.mp3',
    audio_success: 'res/success.mp3',
    audio_bg: 'res/bg.mp3',
    audio_click: 'res/click.mp3'
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}