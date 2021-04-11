function onInstall() {
    this.timer = 0
    this.dir = -1
}

function pickNewDirection() {
    this.dir = RND(0, 5) - 1
    this.timer = RND(1, 4)
    this.__.mover.stopAll()
}

function evo(dt) {
    this.timer -= dt
    if (this.timer < 0) this.pickNewDirection()

    const mover = this.__.mover
    switch(this.dir) {
        case -1:      mover.stopAll(); break;
        case _.UP:    mover.move( _.UP ); break;
        case _.LEFT:  mover.move( _.LEFT ); break;
        case _.DOWN:  mover.move( _.DOWN ); break;
        case _.RIGHT: mover.move( _.RIGHT ); break;
    }
}

