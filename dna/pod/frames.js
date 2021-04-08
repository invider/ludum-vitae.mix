
const alias = 'frames'

const df = {
    timer: 0,
    frame: 0,
    cycle: 'idle',
}

const cycles = {
    fps:   .12,
    cells: 13,
    idle: {
        row:   2,
        start: 0,
        end:   0,
    },
    walk: {
        row:   2,
        start: 1,
        end:   8,
    },
}

function onInstall(st) {
    this.cycles = cycles
    extend(this, df, st)
    this.setCycle( this.cycle )
}

function setCycle(name) {
    if (this.cycle === name) return
    const config = this.cycles[name]
    if (!config) throw `unknown cycle [${name}]`
    this.cycle = name
    this.frame = config.start
    this.timer = 0
}

function evo(dt) {
    this.timer += dt
    if (this.timer > this.cycles.fps) {
        this.frame ++
        this.timer -= this.cycles.fps
        if (this.frame > this.cycles[this.cycle].end) {
            this.frame = this.cycles[this.cycle].start
        }
    }
}

function draw() {
    const config = this.cycles[ this.cycle ]
    const tilex = (config.row * 4 + this.__.dir)
                    * this.cycles.cells
                    + this.frame
    const x = this.__.x - this.__.w/2
    const y = this.__.y - this.__.h + this.__.collider.h/2
    const w = this.__.w
    const h = this.__.h

    blocky()
    this.tiles.draw( tilex, x, y, w, h )

    // debug
    if (this.__.debug) {
        font('32px coolville')
        baseBottom()
        alignCenter()
        fill(.13, .5, .5)
        text('#' + tilex, x, y)
    }
}
