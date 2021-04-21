function handleGlobal(e) {
    lab.hud.chat.onKeyDown(e)
}

function keyDown(e) {
    handleGlobal(e)
    if (e.repeat) return

    const hero = lab.cam.mob.hero
    switch(e.code) {
        case 'ArrowUp':    hero.mover.move( _.UP ); break;
        case 'ArrowLeft':  hero.mover.move( _.LEFT ); break;
        case 'ArrowDown':  hero.mover.move( _.DOWN ); break;
        case 'ArrowRight': hero.mover.move( _.RIGHT ); break;

        case 'Tab':
            lab.hud.skills.touch()
            e.preventDefault()
            break
    }
}
