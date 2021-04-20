const MAX_TOKENS = 65536

function parse(src) {
    const tokenizer = dna.script.lex(src)

    const res = []
    let token = tokenizer.next()
    let tokenCounter = 0
    while(token && tokenCounter < MAX_TOKENS) {
        //log( '' + token )
        res.push( token )
        token = tokenizer.next()
        tokenCounter ++
    }

    const listing = res.join(' ')
    log('\n====================================\n')
    log( listing )
    log('\n====================================\n')
    return listing
}
