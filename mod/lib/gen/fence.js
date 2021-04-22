const W = 64
const H = 64

function horizontal(x, y, n) {
    for (let i = 0; i < n; i++) {
        lab.cam.mob.spawn( dna.prop.Fence, {
            type: 'center',
            x: x,
            y: y,
        })
        x += W
    }
    return n * W
}

function vertical(x, y, n) {
    for (let i = 0; i < n; i++) {
        lab.cam.mob.spawn( dna.prop.Fence, {
            type: 'middle',
            x: x,
            y: y,
        })
        y += H
    }
    return n * H
}

function corner(x, y, type) {
    lab.cam.mob.spawn( dna.prop.Fence, {
        type: type,
        x: x,
        y: y,
    })
}
