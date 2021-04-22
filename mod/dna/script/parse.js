const MAX_STATEMENTS = 65536

function parse(src) {
    let lex = dna.script.lex(src)
    const lv = {
        ls: [],
    }
    const res = []

    let section = lv

    function expectValue() {
        const token = lex.next()
        if (!token || (token.type !== lex.ID
                    && token.type !== lex.STRING
                    && token.type !== lex.NUMBER)) {
            lex.error('value is expected')
        }
        return token.val
    }

    function expectNumber() {
        const token = lex.next()
        if (!token || token.type !== lex.NUMBER) {
            lex.error('number is expected')
        }
        return token.val
    }

    function expectString() {
        const token = lex.next()
        if (!token || token.type !== lex.STRING) {
            lex.error('string is expected')
        }
        return token.val
    }

    function skipLine() {
        let token = lex.next()
        while (token && token.type !== lex.NL) {
            log('SKIPPING ' + token.val)
            token = lex.next()
        }
    }

    function declareMainSection() {
        const name = expectValue()
        skipLine()

        // determine the container for section declaration
        let parent = section
        if (section.__) parent = section.__

        const newSection = {
            __: parent,
            name: name,
            ls: [],
        }
        parent.ls.push(newSection)
        parent[name] = newSection
        section = newSection
    }

    function doStatement() {
        let token = lex.next()
        if (!token) return null

        if (token.type === lex.ID && token.val === '====') {
            return declareMainSection()

        } else {
            //log( '' + token )
            res.push( token )
            return token
        }
    }

    let stmtCounter = 1
    let statement = doStatement()
    
    while(statement && stmtCounter < MAX_STATEMENTS) {
        let statement = doStatement()
        stmtCounter ++
    }

    const listing = res.join(' ')
    log('\n====================================\n')
    log( listing )
    log('\n====================================\n')
    return lv
}
