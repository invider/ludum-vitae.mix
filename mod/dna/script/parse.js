const MAX_STATEMENTS = 65536

function parse(src) {
    let lex = dna.script.lex(src)
    const lv = {
        ls: [],
    }
    const res = []

    let section = lv

    function expectId() {
        const token = lex.next()
        if (!token || (token.type !== lex.ID)) {
            lex.error('id is expected')
        }
        return token.val
    }

    function expectClassifier() {
        const token = lex.next()
        if (!token || (token.type !== lex.ID
                    && token.type !== lex.STRING)) {
            lex.error('classifier is expected')
        }
        return token.val
    }

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

    function matchSpecial(ch) {
        const token = lex.next()
        if (!token) return
        if (token.type === lex.SPECIAL && token.val === ch) return token
        else lex.ret()
    }

    function skipLine() {
        let token = lex.next()
        while (token && token.type !== lex.NL) {
            //log('SKIPPING ' + token.val)
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

        return newSection
    }

    function doCommand(cmd) {
        let res
        switch(cmd) {
            case 'book':
                res = {
                    type: 'book',
                    name: expectValue(),
                    x: expectNumber(),
                    y: expectNumber(),
                }
                if (matchSpecial('+')) {
                    const upSkill = expectNumber()
                    const skill = expectClassifier()
                    res.skills = {}
                    res.skills[skill] = upSkill
                }
                section.ls.push(res)
                break
        }
        return res
    }

    function doStatement() {
        let token = lex.next()
        if (!token) return null

        const series = matchSeries(token, '=')
        if (series > 0) {
            return declareMainSection(min(5-series, 1), token)

        } else if (token.type === lex.SPECIAL && token.val === '.') {
            doCommand( expectId() )

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
