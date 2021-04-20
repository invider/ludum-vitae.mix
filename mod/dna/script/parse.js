const MAX_TOKENS = 65536

function parse(src) {
    const tokenizer = dna.script.lex(src)

    let token = tokenizer.next()
    let tokenCounter = 0
    while(token && tokenCounter < MAX_TOKENS) {
        log( '' + token )
        token = tokenizer.next()
        tokenCounter ++
    }

    return '!!!\n' + src
}
