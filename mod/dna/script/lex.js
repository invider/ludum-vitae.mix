const ID = 1
const STRING = 2
const NUMBER = 3
const SPECIAL = 7
const NL = 9

function type2str(type) {
    let s = 'unknown'
    switch(type) {
        case ID:       s = 'id'; break;
        case STRING:   s = 'string'; break;
        case NUMBER:   s = 'number'; break;
        case SPECIAL:  s = 'special'; break;
        case NL:       s = 'new-line'; break;
    }
    return s
}

function token(type, val, opt) {
    const t = {
        type: type,
        toString: function() {
            switch(this.type) {
                case NL:      return '~\n';
                case ID:      return `[${this.val}]`;
                case NUMBER:  return this.val;
                case STRING:  return `"${this.val}"`;
                case SPECIAL: return `{${this.val}}`;
                default:
                    return (type2str(this.type)
                        + (this.val? `:[${this.val}]` : '')
                        + (this.opt? `(${this.opt})`  : '')
                    )
            }
        }
    }
    if (val) t.val = val
    if (opt) t.opt = opt

    return t
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

function isSpecial(c) {
    return (
           c === '#'
        || c === ':'
        || c === '.'
        || c === '!'
        || c === '*'
        || c === '-'
    )
}

function isDigit(c) {
    if (!isString(c)) return false
    const code = c.charCodeAt(0) - 48
    return (code >= 0 && code < 10)
}

function toDigit(c) {
    return c.charCodeAt(0) - 48
}

function lex(src) {
    src = src || ''
    const input = src.split('')

    let pos = 0
    let line = 0
    let linePos = 0

    function error(msg) {
        throw `LV Script Error @${(line+1)}:${(linePos+1)}: ${msg}`
    }

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

    function skipc() {
        getc()
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
        while ( c === '-' && aheadc() === '-') {
            // the start of a comment
            c = skipLine(c)
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
        if (!c) error('unexpected end of the stream - ["] is expected!')
        return token( STRING, valArr.join('') )
    }

    function consumeNumber(c) {
        let val = toDigit(c)

        c = aheadc()
        while ( isDigit(c) ) {
            val = (val * 10) + toDigit(c)
            skipc()
            c = aheadc()
        }

        return token( NUMBER, val )
    }

    function consumeId(c) {
        const valArr = [ c ]

        c = aheadc()
        while (c && !isSeparator(c)) {
            valArr.push(c)
            skipc()
            c = aheadc()
        }
        return token( ID, valArr.join('') )
    }

    // return the next token
    function next() {
        let c = getc()

        c = skipComments(c)
        c = skipWhitespaces(c)
        if (!c) return null

        if ( isNewLine(c) ) return token(NL)
        if ( isSpecial(c) ) return token(SPECIAL, c)

        if (c === '"') return consumeString()
        if ( isDigit(c) ) return consumeNumber(c)

        return consumeId(c)
    }

    function stringUntil(stopChar) {
        const valArr = []

        let c = getc()
        while (c && c !== stopChar && !isNewLine(c)) {
            valArr.push(c)
            c = getc()
        }
        if (c) retc()
        return token( STRING, valArr.join('') )
    }

    return {
        ID,
        STRING,
        NUMBER,
        SPECIAL,
        NL,

        next,
        error,
        stringUntil,
    }
}
