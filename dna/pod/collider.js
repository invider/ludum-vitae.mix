
const alias = 'collider'

const df = {
    w: 50,
    h: 25,
}

function onInstall() {
    augment(this, df)
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
