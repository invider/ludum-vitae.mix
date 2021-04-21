function setupActors() {
    const mob = lab.cam.mob
    const hero = mob.spawn( dna.Actor, {
        name: 'hero',
        x: rx(.2),
        y: ry(.2),
    })
    hero.install( dna.pod.skillChart )
    _.hero = hero
    //hero.mover.speed = 80
    hero.mover.speed = 120
    lab.cam.follow( hero, true )
    lab.cam.lookAt( hero.x, hero.y )

    const dude1 = mob.spawn( dna.Actor, {
        name: 'dude1',
        dir: _.RIGHT,
        x: rx(.1),
        y: ry(.6),
        tiles: res.dude1,
    })
    dude1.install( dna.pod.randomMover )

    const girl1 = mob.spawn( dna.Actor, {
        name: 'girl1',
        dir: _.LEFT,
        x: ry(.9),
        y: ry(.5),
        tiles: res.girl1,
    })
    girl1.install( dna.pod.randomMover )

    const girl2 = mob.spawn( dna.Actor, {
        name: 'girl2',
        dir: _.UP,
        x: ry(.5),
        y: ry(.9),
        tiles: res.girl2,
    })
    girl2.install( dna.pod.randomMover )
}
setupActors.Z = 21
