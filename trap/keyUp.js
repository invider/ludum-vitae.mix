function keyUp(e) {
    switch(e.code) {
        case 'ArrowUp':    lab.hero.stop( _.UP ); break;
        case 'ArrowLeft':  lab.hero.stop( _.LEFT ); break;
        case 'ArrowDown':  lab.hero.stop( _.DOWN ); break;
        case 'ArrowRight': lab.hero.stop( _.RIGHT ); break;
    }
}
