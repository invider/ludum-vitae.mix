function init() {
    env.tilex = 0
}

function draw() {
    blocky()
    res.punk.draw(env.tilex, 100, 100, 128, 128)

    font('32px coolville')
    baseTop()
    alignRight()
    fill(.13, .5, .5)
    text('#' + env.tilex, rx(.9), ry(.1))
}
