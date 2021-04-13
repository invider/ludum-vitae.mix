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

    touch(actor) {
        if (actor.name === 'hero') {
            // TODO skill up based on the book title/skills
            this.kill()
        }
        log('touched by ' + actor.name)
    }
}
