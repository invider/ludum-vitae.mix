const df = {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
}

class Fence extends dna.Prop {

    constructor(st) {
        super( augment({}, df, st) )

        let tilex = 1
        switch(this.type) {
            case 'left':
                tilex = 0
                this.collider.w = 16
                this.collider.h = 8
                break
            case 'center':
                tilex = 1
                this.collider.w = 64
                this.collider.h = 8
                break
            case 'right':
                tilex = 2
                this.collider.w = 16
                this.collider.h = 8
                break

            case 'top':
                tilex = 18
                this.collider.w = 8
                this.collider.h = 8
                break
            case 'middle':
                this.collider.w = 8
                this.collider.h = 64
                tilex = 17
                break
            case 'bottom':
                tilex = 16
                this.collider.w = 8
                this.collider.h = 8
                break

            case 'top-left':
                tilex = 32
                this.collider.w = 8
                this.collider.h = 8
                break

            case 'top-right':
                tilex = 34
                this.collider.w = 8
                this.collider.h = 8
                break

            case 'bottom-left':
                tilex = 64
                this.collider.w = 8
                this.collider.h = 8
                break

            case 'bottom-right':
                tilex = 66
                this.collider.w = 8
                this.collider.h = 8
                break

        }

        const tileset = [ tilex ]

        this.install( dna.pod.tile, {
            tiles: res.fence,
            tileset: tileset,
            iw: 1,
            ih: 1,
            tw: 64,
            th: 64,
            dx: 0,
            dy: -16,
        })
    }
}
