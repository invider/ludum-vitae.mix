function setupCamera() {
    lab.background = hsl(.04, .20, .4)

    lab.spawn( dna.SlideCamera, {
        Z: 11,
        name: 'cam',

        evo: function(dt) {
            const ls = this._ls
            for (let i = 0; i < ls.length; i++) {
                const layer = ls[i]
                layer.orderY()
            }
            dna.SlideCamera.prototype.evo.call( this, dt )
        }
    })

    function orderY() {
        this._ls.sort( (a, b) => {
            if (!a._positional && !b._positional) return 0
            if (a._positional && !b._positional) return -1
            if (!a._positional && b._positional) return 1

            if (a.y < b.y) return -1
            else if (a.y > b.y) return 1
            else return 0
        })
    }

    lab.cam.touch('ground', {
        Z: 0,
        orderY: orderY,
    })
    lab.cam.touch('mob', {
        Z: 1,
        orderY: orderY,
    })
    lab.cam.touch('sky', {
        Z: 9,
        orderY: orderY,
    })


    lab.touch('fx', {
        Z: 13,
    })
}
setupCamera.Z = 1
