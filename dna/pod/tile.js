
const alias = 'tile'

const df = {
    tileset: [0],
    iw: 1,
    ih: 1,
    dx: 0,
    dy: 0,
}

function onInstall(st) {
    extend(this, df, st)
}

function draw() {
    const tw = this.tw
    const th = this.th
    const w = this.iw * tw
    const h = this.ih * th

    const x = this.__.x - w/2 + this.dx
    const y = this.__.y - h/2 + this.dy

    blocky()
    let ti = 0
    for (let iy = 0; iy < this.ih; ++iy) {
        for (let ix = 0; ix < this.iw; ++ix) {
            const tilex = this.tileset[ti++] || 0
            this.tiles.draw( tilex, x + ix * tw, y + iy * th, tw, th )
        }
    }

    // debug
    if (this.__.debug) {
        font('32px coolville')
        baseBottom()
        alignCenter()
        fill(.13, .5, .5)
        text('#' + tilex, x, y)
    }
}
