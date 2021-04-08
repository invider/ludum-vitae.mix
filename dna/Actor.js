const df = {
    kind: 'actor',
    x: 0,
    y: 0,
    w: 128,
    h: 128,
    dir: _.DOWN,
    speed: 80,
}

let id = 0
class Actor {

    constructor(st) {
        this.name = 'actor' + (++id)
        this.pods = []
        this.actuators = []

        augment(this, df, st)

        this.install( dna.pod.frames, {
            tiles: st.tiles || res.punk,
        })
    }

    install(pod, st) {
        if (!pod) throw 'no pod provided!'
        const clone = mixin({}, pod)
        clone.__ = this
        this.pods.push(clone)
        if (clone.alias) {
            this[clone.alias] = clone
        }
        if (clone.onInstall) clone.onInstall(st)
    }

    uninstall(pod) {
        if (!pod) throw 'pod is expected!'
        if (isString(pod)) {
            pod = this.getPodByName(pod)
            if (!pod) throw `unable to locate the pod [${pod}]`
        }
        const i = this.pods.indexOf(pod)
        if (i >= 0) {
            this.pods.splice(i, 1)
        }
        if (pod.alias && this[pod.alias]) {
            delete this[pod.alias]
        }
    }

    getPodByName(name) {
        for (let pod of this.pods) {
            if (pod.alias === name) return pod
        }
    }

    isMoving() {
        for (let a of this.actuators) {
            if (a) return true
        }
    }

    move(action) {
        this.actuators[action] = true
        this.frames.setCycle('walk')
    }

    stop(action) {
        this.actuators[action] = false
        if (!this.isMoving()) this.frames.setCycle('idle')
    }

    evo(dt) {
        for (let pod of this.pods) {
            if (pod.evo) pod.evo(dt)
        }

        // movement
        if (this.actuators[ _.UP ]) {
            this.dir = _.UP
            this.y -= this.speed * dt
        }
        if (this.actuators[ _.LEFT ]) {
            this.dir = _.LEFT
            this.x -= this.speed * dt
        }
        if (this.actuators[ _.DOWN ]) {
            this.dir = _.DOWN
            this.y += this.speed * dt
        }
        if (this.actuators[ _.RIGHT ]) {
            this.dir = _.RIGHT
            this.x += this.speed * dt
        }
    }

    draw() {
        for (let pod of this.pods) {
            if (pod.draw) pod.draw()
        }
    }
}
