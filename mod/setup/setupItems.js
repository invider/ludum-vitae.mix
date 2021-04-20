function createSigns() {
    const mob = lab.cam.mob
    mob.spawn( dna.prop.Sign, {
        x: 20,
        y: 540,
        label: 'go there...',
    })

    mob.spawn( dna.prop.Sign, {
        x: 840,
        y: 540,
        label: '2018',
    })
    mob.spawn( dna.prop.Sign, {
        x: -420,
        y: 540,
        label: '2007',
    })
}

function createBooks() {
    const mob = lab.cam.mob
    mob.spawn( dna.prop.Book, {
        x: -200,
        y: 200,
        title: 'Java in 21 Days',
    })
    mob.spawn( dna.prop.Book, {
        x: -100,
        y: 200,
        title: 'Something for Dummies',
    })
    mob.spawn( dna.prop.Book, {
        x: 0,
        y: 200,
        title: 'Something for Dummies',
    })
    mob.spawn( dna.prop.Book, {
        x: 100,
        y: 200,
        title: 'Something for Dummies',
    })
    mob.spawn( dna.prop.Book, {
        x: 200,
        y: 200,
        title: 'Something for Dummies',
    })
}

function createAreas() {
    const mob = lab.cam.mob

    mob.spawn( dna.prop.ActiveArea, {
        x: 500,
        y: 200,
        w: 400,
        h: 500,
        lines: [
            'hi there!',
            'glad to see ya!',
        ]
    })

    mob.spawn( dna.prop.ActiveArea, {
        x: -100,
        y: 200,
        w: 400,
        h: 500,
        lines: [
            "Hi!",
            "I'm Igorbot",
        ],
    })
}

function setupItems() {
    createSigns()
    createBooks()
    createAreas()
    // ...
}
setupItems.Z = 13

