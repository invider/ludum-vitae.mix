function draw() {
    font('24px coolville')
    baseTop()
    alignRight()

    fill(.4, .5, .5)
    text('rocks box', rx(1) - 10, 10)

    const w = 32
    const h = 32
    const gap = 0
    let i = 0
    blocky()
    for (let y = 20; y < ry(1); y += h + gap) {
        for (let x = 0; x < 512; x += w + gap) {
            //res.rocks.draw(i++, x, y, 64, 64)
            //res.items.draw(i++, x, y, 64, 64)
            //res.fence.draw(i++, x, y, w, h)
            res.decorations.draw(i++, x, y, w, h)

            lineWidth(1)
            stroke(.25, .5, .7)
            rect(x, y, w, h)
        }
    }
}
