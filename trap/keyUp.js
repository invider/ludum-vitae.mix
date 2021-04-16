function keyUp(e) {
    const hero = lab.cam.mob.hero
    switch(e.code) {
        case 'ArrowUp':    hero.mover.stop( _.UP ); break;
        case 'ArrowLeft':  hero.mover.stop( _.LEFT ); break;
        case 'ArrowDown':  hero.mover.stop( _.DOWN ); break;
        case 'ArrowRight': hero.mover.stop( _.RIGHT ); break;
    }
}
