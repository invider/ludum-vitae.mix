function gravelAt(x, y) {
    lab.cam.ground.spawn( dna.prop.Gravel, {
        x: x,
        y: y,
    })
}

function createRocks() {
    for (let i = 0; i < 256; i++) {
        gravelAt( RND(3800) - 1200, RND(2400) - 400 )
    }
}

function setupGround() {
    createRocks()
}
setupGround.Z = 11
