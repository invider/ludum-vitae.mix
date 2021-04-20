const MAX_TOKENS = 65536

function parse(src) {
    const tokenizer = dna.script.lex(src)

    log('\n\n\n====================================\n')
    let token = tokenizer.next()
    let tokenCounter = 0
    while(token && tokenCounter < MAX_TOKENS) {
        log( '' + token )
        token = tokenizer.next()
        tokenCounter ++
    }
    log('====================================\n')

    return '!!!\n' + src
}
