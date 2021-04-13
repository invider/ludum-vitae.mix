const alias = 'touchable'

const df = {
    w: 64,
    h: 32,
}

function onInstall(st) {
    augment(this, df, st)
}

function touch() {
    const actor = this.__

    const ls = actor.__._ls
    for (let i = 0; i < ls.length; ++i) {
        const target = ls[i]
        if (target !== actor && !target.dead && target.collider) {
            if (target.x - target.collider.w/2
                    < actor.x + this.w/2
                &&
                    target.x + target.collider.w/2
                        > actor.x - this.w/2
                &&
                    target.y - target.collider.h/2
                        < actor.y + this.h/2
                &&
                    target.y + target.collider.h/2
                        > actor.y - this.h/2
            ) {
                this.__.touch(target)
            }
        }
    }
}

function evo(dt) {
    this.touch()
}

function draw() {
    if (!this.debug) return
    const actor = this.__
    const x = actor.x - this.w/2
    const y = actor.y - this.h/2
    lineWidth(2)
    stroke(.2, .5, .4)
    rect(x, y, this.w, this.h)
}
