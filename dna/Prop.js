// @depends(dna/Multipod)

const df = {
    kind: 'prop',
    x: 0,
    y: 0,
    w: 128,
    h: 128,
    solid: true,
}

let id = 0
class Prop extends dna.Multipod {

    constructor(st) {
        super( augment({}, df, st) )

        id++
        if (!this.name) this.name = 'prop' + id

        if (this.solid) {
            this.install( dna.pod.collider )
        }
    }
}
