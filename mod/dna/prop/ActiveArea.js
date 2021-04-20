const df = {
    x: 0,
    y: 0,
    w: 128,
    h: 128,
    solid: false,
}

let id = 0
class ActiveArea extends dna.Prop {

    constructor(st) {
        super( augment({
            name: 'area' + (++id)
        }, df, st) )

        this.install( dna.pod.touchable, {
            w: this.w,
            h: this.h,
        })

        //this.debug = true
    }

    touch(actor) {
        if (this.touched) return
        if (actor.name !== 'hero') return
        this.touched = true

        if (this.lines) actor.say(this.lines)
    }
}
