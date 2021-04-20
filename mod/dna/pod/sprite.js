const alias = 'sprite'

const df = {
    img: res.controller,
    w: 64,
    h: 64,
    dx: 0,
    dy: 0,
}

function onInstall(st) {
    extend(this, df, st)
}

function draw() {
    blocky()

    const x = this.__.x + this.dx - this.w/2
    const y = this.__.y + this.dy - this.h/2
    image(this.img, x, y, this.w, this.h)
}
