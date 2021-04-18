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

    cursor: '_',
    blinkPeriod: .5,
    blinkTimer: 0,
    background: '#000000A0'
}

class Chat {

    constructor(st) {
        this.log = []
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

    sayIt() {
        this.log.push(this.cmd)
        this.cmd = ''
    }

    onClick() {
        log('clicked')
    }

    onKeyDown(e) {
        if (e.keyCode === 13) {
            // handle Enter
            this.sayIt()
        } else if (e.keyCode === 8) {
            // handle Backspace
            if (this.cmd.length > 0) {
                this.cmd = this.cmd.substring(0, this.cmd.length - 1)
            }
        } else if (e.key.length === 1) {
            // handle a character
            this.cmd = this.cmd + e.key
        }
        this.blinkTimer = this.blinkPeriod
    }

    evo(dt) {
        this.blinkTimer -= dt
        if (this.blinkTimer < -this.blinkPeriod) {
            this.blinkTimer = this.blinkPeriod
        }
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
        fill('#000000')
        const cursor = this.blinkTimer < 0? '' : this.cursor
        text(this.cmd + cursor, x, y)
        y -= step

        //fill(.25, .5, .5)
        fill('#000000')
        let i = this.log.length - 1
        while(i >= 0 && y > step) {
            const line = this.log[i--]
            text(line, x, y)
            y -= step
        }

        restore()
    }
}
