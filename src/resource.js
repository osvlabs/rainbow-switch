var res = {
    // Sprites
    sprites: 'res/res.plist',
    sprites_png: 'res/res.png',

    // Particles
    star: 'res/particle_star.plist',
    universe: 'res/particle_universe.plist',
    explode: 'res/particle_explode.plist',

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