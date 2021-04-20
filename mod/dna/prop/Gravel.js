const df = {
    x: 0,
    y: 0,
    w: 128,
    h: 128,
    solid: false,
}

class Gravel extends dna.Prop {

    constructor(st) {
        super( extend({}, df, st) )

        let tilex = (14 * 16) + RND(4)
        const tileset = [ tilex ]

        this.install( dna.pod.tile, {
            tiles: res.rocks,
            tileset: tileset,
            iw: 1,
            ih: 1,
            tw: 64,
            th: 64,
            dy: 64,
        })
    }
}
