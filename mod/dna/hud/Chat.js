const df = {
    x: 0,
    y: 0,
    w: 100,
    h: 100,
    rw: .4,
    rh: .2,
    stick: 'right',
    edge: {
        top: 10,
        left: 30,
        right: 40,
        bottom: 5,
    },

    fontSize: 28,
    //fontFace: 'pixel-operator-mono',
    fontFace: 'coolville',
    lineSpacing: 1,

    disabled: false,
    cursor: '_',
    blinkPeriod: .5,
    blinkTimer: 0,
    background: '#000000A0',

    typing: false,
    typeSpeed: 16,
    typeTimer: 0,
}

class Chat {

    constructor(st) {
        this.log = []
        this.style = []
        this.buffer = []
        this.cmd = ''
        augment(this, df, st)
    }

    adjust() {
        this.w = rx( this.rw )
        this.h = ry( this.rh )
        this.edge.bottom = 5
        switch(this.stick) {
            case 'right':
                this.x = rx(1) - this.w
                this.y = ry(1) - this.h
                break
            case 'left':
                this.x = 0
                this.y = ry(1) - this.h
                break
            case 'center':
                this.x = rx(.5) - this.w/2
                this.y = ry(1) - this.h
                break
            case 'middle':
                this.h = this.w
                this.x = rx(.5) - this.w/2
                this.y = ry(.5) - this.h/2
                this.edge.bottom = 40
                break
        }
    }

    voiceIt(txt) {
        const utterance = new SpeechSynthesisUtterance(txt);
        //utterance.pitch = .24
        //log('pitch: ' + utterance.pitch)
        if (env.voice) utterance.voice = env.voice
        speechSynthesis.speak(utterance);
    }

    // terminal-type provided text
    typeIt(txt, enable) {
        if (!txt) return
        if (isArray(txt)) {
            txt = txt.join('\n')
        }
        const bufExt = txt.split('')
        this.buffer = this.buffer.concat( bufExt )
        this.log.push('')
        this.disabled = !enable
        this.typing = true
        this.typeTimer = 0

        lib.sfx('message')
        this.voiceIt(txt)

        return ceil(txt.length / this.typeSpeed)
    }

    sayIt() {
        // TODO interpret the command
        this.log.push(this.cmd)
        this.style[ this.log.length - 1 ] = env.style.chat.user
        this.cmd = ''
    }

    onClick() {
        log('clicked')
    }

    onKeyDown(e) {
        if (this.disabled) return

        if (e.keyCode === 13) {
            // handle Enter
            this.sayIt()
            lib.sfx('enter')

        } else if (e.keyCode === 8) {
            // handle Backspace
            if (this.cmd.length > 0) {
                this.cmd = this.cmd.substring(0, this.cmd.length - 1)
                lib.sfx('backspace')
            }

        } else if (e.key.length === 1) {
            // handle a character
            this.cmd = this.cmd + e.key
            lib.sfx('type')
        }
        this.blinkTimer = this.blinkPeriod
    }

    out(c) {
        if (c === '\n') {
            this.log.push('')
        } else {
            const cur = this.log.pop()
            this.log.push(cur + c)
        }
    }

    evoTyping(dt) {
        this.typeTimer -= dt
        if (this.typeTimer < 0) {
            this.typeTimer += 1/this.typeSpeed

            if (this.buffer.length === 0) {
                // no more buffered output
                this.typing = false
                this.disabled = false
            } else {
                this.out( this.buffer.shift() )
            }
        }
    }

    evo(dt) {
        this.blinkTimer -= dt
        if (this.blinkTimer < -this.blinkPeriod) {
            this.blinkTimer = this.blinkPeriod
        }

        if (this.typing) this.evoTyping(dt)
    }

    draw() {
        /*
        fill(this.background)
        rect(this.x, this.y, this.w, this.h)
        */
        blocky()
        image(res.paper, this.x, this.y, this.w, this.w)

        save()
        translate(this.x + this.edge.left, this.y + this.edge.top)
        const hEdge = this.edge.left + this.edge.right
        const vEdge = this.edge.top + this.edge.bottom
        clip(0, 0, this.w - hEdge, this.h - vEdge)

        const step = this.fontSize + this.lineSpacing
        font(this.fontSize + 'px ' + this.fontFace)
        alignLeft()
        baseBottom()

        let x = 0
        let y = this.h - vEdge

        //fill(.55, .5, .5)
        fill( env.style.chat.user )
        if (this.disabled) {
            if (this.cmd.length > 0) {
                text(this.cmd, x, y)
                y -= step
            }
        } else {
            const cursor = this.blinkTimer < 0? '' : this.cursor
            text(this.cmd + cursor, x, y)
            y -= step
        }

        //fill(.25, .5, .5)
        let i = this.log.length - 1
        while(i >= 0 && y > step) {
            const style = this.style[i] || fill( env.style.chat.bot )
            const line = this.log[i--]
            fill(style)
            text(line, x, y)
            y -= step
        }

        restore()
    }
}
