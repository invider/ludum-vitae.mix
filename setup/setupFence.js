function hfence(x, y, w, n) {
    for (let i = 0; i < n; i++) {
        lab.cam.spawn( dna.prop.Fence, {
            type: 'center',
            x: x,
            y: y,
        })
        x += w
    }
}

function vfence(x, y, h, n) {
    for (let i = 0; i < n; i++) {
        lab.cam.spawn( dna.prop.Fence, {
            type: 'middle',
            x: x,
            y: y,
        })
        y += h
    }
}

function setupFence() {
    const w = 64
    const h = 64

    const iw = 40
    const ih = 20
    const x1 = -640
    const y1 = 0
    const x2 = x1 + iw * w
    const y2 = y1 + ih * h

    hfence(x1 + w, y1, w, iw - 1)
    hfence(x1 + w, y2, w, iw - 1)

    vfence(x1, y1 + h, w, ih - 1)
    vfence(x2, y1 + h, w, ih - 1)

    lab.cam.spawn( dna.prop.Fence, {
        type: 'top-left',
        x: x1,
        y: y1,
    })
    lab.cam.spawn( dna.prop.Fence, {
        type: 'top-right',
        x: x2,
        y: y1,
    })
    lab.cam.spawn( dna.prop.Fence, {
        type: 'bottom-left',
        x: x1,
        y: y2,
    })
    lab.cam.spawn( dna.prop.Fence, {
        type: 'bottom-right',
        x: x2,
        y: y2,
    })
}
setupFence.Z = 12
