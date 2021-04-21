function setupHud() {
    lab.spawn( dna.hud.Hud, {
        Z: 21,
        name: 'hud',
    })

    lab.hud.spawn( dna.hud.Chat, {
        name: 'chat',
        stick: 'center',
    })

    lab.hud.spawn( dna.hud.Skills, {
        name: 'skills',
    })
}
setupHud.Z = 2
