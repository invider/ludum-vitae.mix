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

function hfence(x, y, w, n) {
    for (let i = 0; i < n; i++) {
        lab.cam.spawn( dna.prop.Fence, {
            type: 'center',
            x: x,
            y: y,
        })
        x += w
    }
}

function vfence(x, y, h, n) {
    for (let i = 0; i < n; i++) {
        lab.cam.spawn( dna.prop.Fence, {
            type: 'middle',
            x: x,
            y: y,
        })
        y += h
    }
}

function createFence() {
    const w = 64
    const h = 64

    const iw = 40
    const ih = 20
    const x1 = -640
    const y1 = 0
    const x2 = x1 + iw * w
    const y2 = y1 + ih * h

    hfence(x1 + w, y1, w, iw - 1)
    hfence(x1 + w, y2, w, iw - 1)

    vfence(x1, y1 + h, w, ih - 1)
    vfence(x2, y1 + h, w, ih - 1)

    lab.cam.spawn( dna.prop.Fence, {
        type: 'top-left',
        x: x1,
        y: y1,
    })
    lab.cam.spawn( dna.prop.Fence, {
        type: 'top-right',
        x: x2,
        y: y1,
    })
    lab.cam.spawn( dna.prop.Fence, {
        type: 'bottom-left',
        x: x1,
        y: y2,
    })
    lab.cam.spawn( dna.prop.Fence, {
        type: 'bottom-right',
        x: x2,
        y: y2,
    })



    /*
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
    */
}

function gravelAt(x, y) {
    lab.cam.spawn( dna.prop.Gravel, {
        x: x,
        y: y,
    })
}

function createRocks() {
    for (let i = 0; i < 256; i++) {
        gravelAt( RND(3800) - 1200, RND(2400) - 400 )
    }
}

function createSigns() {
    lab.cam.spawn( dna.prop.Sign, {
        x: 20,
        y: 540,
        label: 'go there...',
    })

    lab.cam.spawn( dna.prop.Sign, {
        x: 840,
        y: 540,
        label: '2018',
    })
    lab.cam.spawn( dna.prop.Sign, {
        x: -420,
        y: 540,
        label: '2007',
    })
}

function createBooks() {
    lab.cam.spawn( dna.prop.Book, {
        x: -200,
        y: 200,
        title: 'Java in 21 Days',
    })
    lab.cam.spawn( dna.prop.Book, {
        x: -100,
        y: 200,
        title: 'Something for Dummies',
    })
    lab.cam.spawn( dna.prop.Book, {
        x: 0,
        y: 200,
        title: 'Something for Dummies',
    })
    lab.cam.spawn( dna.prop.Book, {
        x: 100,
        y: 200,
        title: 'Something for Dummies',
    })
    lab.cam.spawn( dna.prop.Book, {
        x: 200,
        y: 200,
        title: 'Something for Dummies',
    })
}

function setup() {
    lab.background = hsl(.04, .20, .4)

    createCamera()
    createHud()
    createActors()
    createRocks()
    createFence()
    createSigns()
    createBooks()
}
