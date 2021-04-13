const df = {
    x: 0,
    y: 0,
    w: 148,
    h: 148,
}

class Sign extends dna.Prop {

    constructor(st) {
        super( augment({}, df, st) )

        this.install( dna.pod.sprite, {
            img: res.signWide,
            w: this.w,
            h: this.h,
            dy: -64,
        })
        this.h = this.h + 128
        this.collider.w = 118
        this.collider.h = 6
    }

    draw() {
        super.draw()

        fill('#000000')
        font(env.style.signFont)
        alignCenter()
        baseMiddle()
        text(this.label, this.x, this.y - 88)
    }
}
