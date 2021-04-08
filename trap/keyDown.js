function keyDown(e) {
    if (e.repeat) return

    switch(e.code) {
        case 'ArrowUp':    lab.hero.move( _.UP ); break;
        case 'ArrowLeft':  lab.hero.move( _.LEFT ); break;
        case 'ArrowDown':  lab.hero.move( _.DOWN ); break;
        case 'ArrowRight': lab.hero.move( _.RIGHT ); break;
    }
}
