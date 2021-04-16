function createSigns() {
    lab.cam.spawn( dna.prop.Sign, {
        x: 20,
        y: 540,
        label: 'go there...',
    })

    lab.cam.spawn( dna.prop.Sign, {
        x: 840,
        y: 540,
        label: '2018',
    })
    lab.cam.spawn( dna.prop.Sign, {
        x: -420,
        y: 540,
        label: '2007',
    })
}

function createBooks() {
    lab.cam.spawn( dna.prop.Book, {
        x: -200,
        y: 200,
        title: 'Java in 21 Days',
    })
    lab.cam.spawn( dna.prop.Book, {
        x: -100,
        y: 200,
        title: 'Something for Dummies',
    })
    lab.cam.spawn( dna.prop.Book, {
        x: 0,
        y: 200,
        title: 'Something for Dummies',
    })
    lab.cam.spawn( dna.prop.Book, {
        x: 100,
        y: 200,
        title: 'Something for Dummies',
    })
    lab.cam.spawn( dna.prop.Book, {
        x: 200,
        y: 200,
        title: 'Something for Dummies',
    })
}

function setupItems() {
    createSigns()
    createBooks()
    // ...
}
setupItems.Z = 13

