const alias = 'mover'

const df = {
    speed: 80,
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

function evo(dt) {
    // movement
    const actor = this.__
    if (this.actuators[ _.UP ]) {
        actor.dir = _.UP
        actor.y -= this.speed * dt
    }
    if (this.actuators[ _.LEFT ]) {
        actor.dir = _.LEFT
        actor.x -= this.speed * dt
    }
    if (this.actuators[ _.DOWN ]) {
        actor.dir = _.DOWN
        actor.y += this.speed * dt
    }
    if (this.actuators[ _.RIGHT ]) {
        actor.dir = _.RIGHT
        actor.x += this.speed * dt
    }
}
