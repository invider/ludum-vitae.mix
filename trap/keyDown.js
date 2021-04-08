function keyDown(e) {
    if (e.repeat) return

    const hero = lab.cam.hero
    switch(e.code) {
        case 'ArrowUp':    hero.move( _.UP ); break;
        case 'ArrowLeft':  hero.move( _.LEFT ); break;
        case 'ArrowDown':  hero.move( _.DOWN ); break;
        case 'ArrowRight': hero.move( _.RIGHT ); break;
    }
}
