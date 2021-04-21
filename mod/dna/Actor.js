// @depends(dna/Multipod)

const df = {
    kind: 'actor',
    x: 0,
    y: 0,
    w: 128,
    h: 128,
    dir: _.DOWN,
    blinkTimer: 0,
}

let id = 0
class Actor extends dna.Multipod {

    constructor(st) {
        super( augment({}, df, st) )

        id++
        if (!this.name) this.name = 'actor' + id

        this.install( dna.pod.frames, {
            tiles: st.tiles || res.punk,
        })
        this.install( dna.pod.collider )
        this.install( dna.pod.mover )
    }

    say(lines) {
        const blinkTime = lab.hud.chat.typeIt(lines)
        this.blinkTimer += blinkTime + env.tune.talkIconDelay

        //const utterance = new SpeechSynthesisUtterance("Hello world");
        //speechSynthesis.speak(utterance);

        /*
        let utterance = new SpeechSynthesisUtterance("Hello world!");
        utterance.pitch = 0
        utterance.volume = 0
        utterance.rate = 0
        speechSynthesis.speak(utterance);

        utterance.onerror = function (event) {
            console.error('SpeechSynthesisUtterance.onerror');
        }
        */
    }

    evoBlinker(dt) {
        if (this.blinkTimer > 0) {
            this.blinkTimer -= dt
            if (this.blinkTimer <= 0) {
                this.blinkTimer = 0
            }
        }
    }

    evo(dt) {
        super.evo(dt)
        this.evoBlinker(dt)
    }

    drawBlinker() {
        const r = this.w/2
        const x = this.x + r * .2
        const y = this.y - this.h * 1.2
        image(res.icon.talk, x, y, r, r)
    }

    draw() {
        super.draw()

        if (this.blinkTimer > 0) this.drawBlinker()
    }
}
