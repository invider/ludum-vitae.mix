function poof(x, y) {
    lab.cam.sky.spawn( dna.Emitter, {
        x: x,
        y: y,
        color: '#00B0F060',
        lifespan: 0.1,
        force: 20000,
        radius: 0,
        size: 3, vsize: 2,
        speed: 120, vspeed: 0,
        angle: 0, spread: TAU,
        minLifespan: .1, vLifespan: 0,
    })
}
