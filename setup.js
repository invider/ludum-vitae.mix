function createCamera() {
    lab.spawn( dna.SlideCamera, {
        name: 'cam',

        orderY: function() {
            this._ls.sort( (a, b) => {
                if (!a._positional && !b._positional) return 0
                if (a._positional && !b._positional) return -1
                if (!a._positional && b._positional) return 1

                if (a.y < b.y) return -1
                else if (a.y > b.y) return 1
                else return 0
            })
        },

        evo: function(dt) {
            this.orderY()
            dna.SlideCamera.prototype.evo.call( this, dt )
        }
    })
}

function createActors() {
    const hero = lab.cam.spawn( dna.Actor, {
        name: 'hero',
        x: rx(.2),
        y: ry(.2),
    })
    lab.cam.follow( hero, true )

    lab.cam.spawn( dna.Actor, {
        name: 'dude2',
        dir: _.RIGHT,
        x: rx(.1),
        y: ry(.6),
    })

    lab.cam.spawn( dna.Actor, {
        name: 'dude3',
        dir: _.LEFT,
        x: ry(.9),
        y: ry(.5),
    })

    lab.cam.spawn( dna.Actor, {
        name: 'dude4',
        dir: _.UP,
        x: ry(.5),
        y: ry(.9),
    })
}

function setup() {
    lab.background = hsl(.05, .25, .6)

    createCamera()
    createActors()
}
