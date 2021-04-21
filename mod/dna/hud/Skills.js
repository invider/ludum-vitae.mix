const df = {
    hidden: true,
    rw: .5,
    rh: .5,
    fadeTime: .5,
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

    show() {
        this.hidden = false
        this.fadeIn = this.fadeTime
    }

    hide() {
        this.fadeOut = this.fadeTime
    }

    touch() {
        if (this.fadeIn > 0 || this.fadeOut > 0) return
        if (this.hidden) this.show()
        else this.hide()
    }

    evo(dt) {
        if (this.hidden) return
        if (this.fadeIn > 0) {
            this.fadeIn -= dt
            if (this.fadeIn <= 0) this.fadeIn = 0
        }
        if (this.fadeOut > 0) {
            this.fadeOut -= dt
            if (this.fadeOut <= 0) {
                this.fadeOut = 0
                this.hidden = true
            }
        }
    }

    draw() {
        save()
        if (this.fadeIn > 0) {
            alpha(1 - this.fadeIn/this.fadeTime)
        }
        if (this.fadeOut > 0) {
            alpha(this.fadeOut/this.fadeTime)
        }

        blocky()
        image(res.paper, this.x, this.y, this.w, this.w)

        restore()
    }
}
