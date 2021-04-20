// An entity consisting solely of multiple pods
let podId = 0
class Multipod {

    constructor(st) {
        augment(this, st)
        this.pods = []
    }

    install(pod, st) {
        if (!pod) throw 'no pod provided!'
        const clone = mixin({}, pod)
        clone.id = ++podId
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

    evo(dt) {
        for (let pod of this.pods) {
            if (pod.evo) pod.evo(dt)
        }
    }

    draw(dt) {
        for (let pod of this.pods) {
            if (pod.draw) pod.draw()
        }

        if (this.debug) {
            const x = this.x - this.w/2
            const y = this.y - this.h/2
            lineWidth(2)
            stroke(.01, .5, .4)
            rect(x, y, this.w, this.h)
        }
    }

    kill() {
        this.dead = true

        const multipod = this
        defer(() => {
            multipod.__.detach(multipod)
        })
    }
}
