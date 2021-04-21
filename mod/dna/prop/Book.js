const df = {
    x: 0,
    y: 0,
    w: 48,
    h: 48,
    solid: false,
}

let id = 0
class Book extends dna.Prop {

    constructor(st) {
        super( extend({
            name: 'book' + (++id)
        }, df, st) )

        this.install( dna.pod.sprite, {
            img: res.book[ RND(res.book.length - 1) ],
            w: this.w,
            h: this.h,
        })
        this.install( dna.pod.touchable, {
            w: 42,
            h: 16,
        })
    }

    pick(actor) {
        if (this.skills) {
            actor.skillChart.skillUp( this.skills )
        }

        const sx = lab.cam.gx(actor.x)
        const sy = lab.cam.gy(actor.y - actor.h * .8)
        lib.tfx.flyingText( this.title, sx, sy )
        lib.fx.poof( this.x, this.y )
        this.kill()
        lib.sfx('pick')
    }

    touch(actor) {
        if (actor.skillChart) {
            this.pick(actor)
        }
    }
}
