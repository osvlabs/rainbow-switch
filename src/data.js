util.data =  {
    levels: [
        /* default: {
             colors: 4,
             thick: 25,
             start: 60,
             degree: 60
         },*/
        [
            {
                type: 'Group',
                parts: [{
                    type: 'Cross',
                    radius: 100
                }, {
                    type: 'Cross',
                    radius: 100
                }, {
                    type: 'Circle',
                    radius: 250,
                    thick: 25,
                    x: 0
                }],
                speed: 5,
                x: 111
            }
        ], [
            {
                type: 'Group',
                parts: [
                    {
                        type: 'Circle',
                        radius: 100
                    }, {
                        type: 'Circle',
                        radius: 100
                    }
                ],
                speed: 3,
                x: 100,
                starDeltaY: 120
            }
        ], [
            {
                type: 'Group',
                parts: [
                    {
                        type: 'Circle',
                        radius: 100
                    }, {
                        type: 'Circle',
                        radius: 150
                    }
                ],
                speed: 3
            }
        ], [
            {
                type: 'Cross',
                radius: 150,
                speed: -2,
                x: -100,
                shake: 30
            }
        ], [
            {
                type: 'Diamond',
                speed: 2,
                radius1: 100,
                radius2: 150,
                shake: 40
            }
        ], [
            {
                type: 'Isogon',
                radius: 180,
                thick: 40,
                colors: 3,
                shake: 30
            }
        ], [
            {
                type: 'Line',
                speed: -7,
                shake: 10
            }, {
                type: 'Line',
                speed: 7,
                shake: 30
            }
        ], [
            {
                type: 'Sector',
                radius: 600,
                shake: 40
            }
        ], [
            {
                type: 'Circle',
                radius: 150,
                shake: 40
            }
        ], [
            {
                type: 'Diamond',
                radius1: 100,
                radius2: 150
            }
        ], [
            {
                type: 'Cross',
                radius: 150,
                speed: -2,
                x: -100
            }
        ], [
            {
                type: 'Circle',
                radius: 150
            }
        ], [
            {
                type: 'Line',
                speed: -7
            }, {
                type: 'Line',
                speed: 7
            }
        ], [
            {
                type: 'Sector',
                radius: 600,
                speed: 1
            }
        ], [
            {
                type: 'Circle',
                radius: 150
            }
        ], [
            {
                type: 'Isogon',
                radius: 180,
                thick: 40,
                colors: 3
            }
        ], [
            {
                type: 'Isogon',
                radius: 180
            }
        ]
    ]
};