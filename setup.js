function setup() {
    lab.background = hsl(.05, .25, .6)

    lab.spawn( dna.Actor, {
        name: 'hero',
        x: rx(.2),
        y: ry(.2),
    })

    lab.spawn( dna.Actor, {
        name: 'dude2',
        dir: _.RIGHT,
        x: rx(.1),
        y: ry(.6),
    })

    lab.spawn( dna.Actor, {
        name: 'dude3',
        dir: _.LEFT,
        x: ry(.9),
        y: ry(.5),
    })

    lab.spawn( dna.Actor, {
        name: 'dude4',
        dir: _.UP,
        x: ry(.5),
        y: ry(.9),
    })
}
