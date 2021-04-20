function burns() {
    let doc=nlp(`OK, Mr. Burns, what's your first name?`)

    //grab a part of it ('Mr. Burns')
    let m1= doc.people()
    //do a match on our match
    let m2 = m1.match('(simpson|burns)')
    //change it..
    m2.toUpperCase()
    //print the original document
    console.dir( doc.json() )
}

function setupNLP() {
    log('======= COMPROMISE =======')

    const dat = _.dat

    const doc = nlp(dat.lineOne)

    console.dir( nlp.tokenize( dat.lineOne ).termList() ) 
    console.dir( nlp( dat.lineOne ).termList() ) 

    //const s = doc.sentence
    //console.dir(statement)
    
    burns()
}

