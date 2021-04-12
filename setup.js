function createCamera() {
    lab.spawn( dna.SlideCamera, {
        Z: 11,
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

function createHud() {
    lab.spawn( dna.hud.Hud, {
        Z: 21,
        name: 'hud',
    })

    lab.hud.spawn( dna.hud.Chat, {
        name: 'chat',
    })
}

function createActors() {
    const hero = lab.cam.spawn( dna.Actor, {
        name: 'hero',
        x: rx(.2),
        y: ry(.2),
    })
    //hero.mover.speed = 80
    hero.mover.speed = 120
    lab.cam.follow( hero, true )
    lab.cam.lookAt( hero.x, hero.y )

    const dude1 = lab.cam.spawn( dna.Actor, {
        name: 'dude1',
        dir: _.RIGHT,
        x: rx(.1),
        y: ry(.6),
        tiles: res.dude1,
    })
    dude1.install( dna.pod.randomMover )

    const girl1 = lab.cam.spawn( dna.Actor, {
        name: 'girl1',
        dir: _.LEFT,
        x: ry(.9),
        y: ry(.5),
        tiles: res.girl1,
    })
    girl1.install( dna.pod.randomMover )

    const girl2 = lab.cam.spawn( dna.Actor, {
        name: 'girl2',
        dir: _.UP,
        x: ry(.5),
        y: ry(.9),
        tiles: res.girl2,
    })
    girl2.install( dna.pod.randomMover )
}

function createFence() {

    const w = 64
    let x = 400
    let y = 200

    lab.cam.spawn( dna.prop.Fence, {
        type: 'left',
        x: x,
        y: y,
        w: 128,
        h: 128,
    })

    x += w
    lab.cam.spawn( dna.prop.Fence, {
        type: 'center',
        x: x,
        y: y,
        w: 128,
        h: 128,
    })

    x += w
    lab.cam.spawn( dna.prop.Fence, {
        type: 'right',
        x: x,
        y: y,
        w: 128,
        h: 128,
    })


    x = 350
    y = 200
    lab.cam.spawn( dna.prop.Fence, {
        type: 'top',
        x: x,
        y: y,
        w: 128,
        h: 128,
    })

    y += w
    lab.cam.spawn( dna.prop.Fence, {
        type: 'middle',
        x: x,
        y: y,
        w: 128,
        h: 128,
    })

    y += w
    lab.cam.spawn( dna.prop.Fence, {
        type: 'bottom',
        x: x,
        y: y,
        w: 64,
        h: 64,
    })

    x = 400
    y = 400
    lab.cam.spawn( dna.prop.Fence, {
        type: 'top-left',
        x: x,
        y: y,
        w: 128,
        h: 128,
    })
    lab.cam.spawn( dna.prop.Fence, {
        type: 'top-right',
        x: x + 64,
        y: y,
        w: 128,
        h: 128,
    })
    lab.cam.spawn( dna.prop.Fence, {
        type: 'bottom-left',
        x: x,
        y: y + 64,
        w: 128,
        h: 128,
    })
    lab.cam.spawn( dna.prop.Fence, {
        type: 'bottom-right',
        x: x + 64,
        y: y + 64,
        w: 128,
        h: 128,
    })
    
}

function setup() {
    lab.background = hsl(.05, .25, .6)

    createCamera()
    createHud()
    createActors()
    createFence()
}
