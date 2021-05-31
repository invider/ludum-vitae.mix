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

    function matchSeries(token, base) {
        if (token.type !== lex.ID) return 0

        let count = 0
        token.val.split('').forEach(ch => {
            if (ch === base) count ++
        })
        if (count === token.val.length) return count
        else return 0
    }

    function declareMainSection(level) {
        const name = lex.stringUntil('=')
        if (name) name.val = name.val.trim()
        log('SECTION::: ' + name)
        skipLine()

        // determine the container for section declaration
        let parent = section
        if (section.__) parent = section.__

        const newSection = {
            __: parent,
            level: level,
            name: name.val,
            ls: [],
        }
        parent.ls.push(newSection)
        parent[name] = newSection
        section = newSection
    }

    function doStatement() {
        let token = lex.next()
        if (!token) return null

        const series = matchSeries(token, '=')
        if (series > 0) {
            return declareMainSection(min(5-series, 1), token)

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
