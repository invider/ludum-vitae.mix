// @depends(dna/Multipod)

const df = {
    kind: 'actor',
    x: 0,
    y: 0,
    w: 128,
    h: 128,
    dir: _.DOWN,
}

let id = 0
class Actor extends dna.Multipod {

    constructor(st) {
        super( augment({}, df, st) )

        id++
        if (!this.name) this.name = 'actor' + id

        this.install( dna.pod.frames, {
            tiles: st.tiles || res.punk,
        })
        this.install( dna.pod.collider )
        this.install( dna.pod.mover )
    }
}
