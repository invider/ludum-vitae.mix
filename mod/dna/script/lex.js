const ID = 1
const STRING = 2
const SPECIAL = 3
const NL = 9

function type2str(type) {
    let s = 'unknown'
    switch(type) {
        case ID:       s = 'id'; break;
        case STRING:   s = 'string'; break;
        case SPECIAL:  s = 'special'; break;
        case NL:       s = 'new-line'; break;
    }
    return s
}

function token(type, val, opt) {
    const t = {
        type: type,
        toString: function() {
            return (type2str(this.type)
                + (this.val? `:[${this.val}]` : '')
                + (this.opt? `(${this.opt})`  : '')
            )
        }
    }
    if (val) t.val = val
    if (opt) t.opt = opt

    return t
}

function lexError(msg) {
    return `Error ${line}:${linePos}: ${msg}`
}

function isWhitespace(c) {
    return (c === ' ' || c === '\t')
}

function isNewLine(c) {
    return (c === '\n')
}

function isSeparator(c) {
    return isWhitespace(c) || isNewLine(c)
}

function isDigit(c) {
    if (isString(c)) return false
    const code = c.charCodeAt(0) - 48
    return (code >= 0 && code < 10)
}


function lex(src) {
    src = src || ''
    const input = src.split('')

    let pos = 0
    let line = 0
    let linePos = 0

    function aheadc() {
        return input[pos]
    }

    function getc() {
        const c = input[pos++]

        // handle a new line
        if (c === '\n' && input[pos] === '\r') pos++
        if (c === '\r') {
            if (input[pos] === '\n') pos++
            c = '\n'
        }
        if (c === '\n') {
            line ++
            linePos = 0
        } else {
            linePos ++
        }
        return c
    }

    function retc() {
        if (pos > 0) pos--
    }

    function skipLine(c) {
        while( c && !isNewLine(c) ) {
            c = getc()
        }
        c = getc()
        return c
    }

    function skipComments(c) {
        if (c === '#' || ( c === '-' && aheadc() === '-')) {
            // the start of a comment
            return skipLine(c)
        }
        return c
    }

    function skipWhitespaces(c) {
        while( c && isWhitespace(c) ) c = getc()
        return c
    }

    function consumeString() {
        const valArr = []

        let c = getc()
        while (c && c !== '"') {
            valArr.push(c)
            c = getc()
        }
        if (!c) lexError('unexpected end of the stream - ["] is expected!')
        return token( STRING, valArr.join('') )
    }

    // return the next token
    function next() {
        let c = getc()

        c = skipComments(c)
        c = skipWhitespaces(c)
        if ( isNewLine(c) ) return token(NL)

        if (!c) return null

        if (c === '"') return consumeString()

        // got an ID
        const valArr = [ c ]

        c = getc()
        while (c && !isSeparator(c)) {
            valArr.push(c)
            c = getc()
        }
        return token( ID, valArr.join('') )
    }

    return {
        ID,
        STRING,
        SPECIAL,
        NL,

        next,
    }
}
