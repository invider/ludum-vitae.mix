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

        translate(this.x, this.y)
        clip(0, 0, this.w, this.w)

        blocky()
        image(res.paper, 0, 0, this.w, this.w)

        fill( env.style.chat.bot )
        font('32px coolville')
        baseTop()
        alignCenter()

        text('skills', this.w/2, 30)

        alignLeft()
        const step = 25
        let x = 40
        let y = 70

        const skills = _.hero.skillChart.getSkills()
        Object.keys(skills).forEach(skill => {
            const points = skills[skill]
            text(`${skill}: ${points}`, x, y)
            y += step
        })
        restore()
    }
}
