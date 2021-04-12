const alias = 'mover'

const df = {
    speed: 50,
}

function onInstall() {
    this.actuators = []
    augment(this, df)
}

function isMoving() {
    for (let a of this.actuators) {
        if (a) return true
    }
}

function move(action) {
    this.actuators[action] = true
    this.__.frames.setCycle('walk')
}

function stop(action) {
    this.actuators[action] = false
    if (!this.isMoving()) this.__.frames.setCycle('idle')
}

function stopAll() {
    for (let i = 0; i < this.actuators.length; i++) {
        this.actuators[i] = false
    }
    this.__.frames.setCycle('idle')
}

function saveCoords() {
    this.px = this.__.x
    this.py = this.__.y
}

function restoreCoords() {
    this.__.x = this.px
    this.__.y = this.py
}

function collide() {
    if (!this.__.collider) return false
    return this.__.collider.collide()
}

function evo(dt) {
    // movement
    const actor = this.__
    this.saveCoords()

    if (this.actuators[ _.UP ]) {
        actor.dir = _.UP
        actor.y -= this.speed * dt
        if (this.collide()) this.restoreCoords()
    }
    if (this.actuators[ _.LEFT ]) {
        actor.dir = _.LEFT
        actor.x -= this.speed * dt
        if (this.collide()) this.restoreCoords()
    }
    if (this.actuators[ _.DOWN ]) {
        actor.dir = _.DOWN
        actor.y += this.speed * dt
        if (this.collide()) this.restoreCoords()
    }
    if (this.actuators[ _.RIGHT ]) {
        actor.dir = _.RIGHT
        actor.x += this.speed * dt
        if (this.collide()) this.restoreCoords()
    }
}
