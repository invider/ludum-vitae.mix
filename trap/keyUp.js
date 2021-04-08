function keyUp(e) {
    const hero = lab.cam.hero
    switch(e.code) {
        case 'ArrowUp':    hero.stop( _.UP ); break;
        case 'ArrowLeft':  hero.stop( _.LEFT ); break;
        case 'ArrowDown':  hero.stop( _.DOWN ); break;
        case 'ArrowRight': hero.stop( _.RIGHT ); break;
    }
}
