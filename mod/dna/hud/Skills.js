const df = {
    hidden: true,
    rw: .5,
    rh: .5,
}

class Skills {
    constructor(st) {
        augment(this, df, st)
    }

    adjust() {
        this.w = rx( this.rw )
        this.h = ry( this.rh )
        this.x = rx(.5) - this.w/2
        this.y = ry(.4) - this.h/2
    }

    touch() {
        this.hidden = !this.hidden
    }

    draw() {
        blocky()
        image(res.paper, this.x, this.y, this.w, this.w)
    }
}
