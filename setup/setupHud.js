function setupHud() {
    lab.spawn( dna.hud.Hud, {
        Z: 21,
        name: 'hud',
    })

    lab.hud.spawn( dna.hud.Chat, {
        name: 'chat',
        stick: 'center',
    })
}
setupHud.Z = 2
