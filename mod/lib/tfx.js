function flyingText(msg, x, y) {
    lab.fx.spawn('text/fadeText', {
        text: msg,
        font: '32px coolville',
        fillStyle: '#ffffff',
        align: 'left',
        x: x,
        y: y,
        dx: 30,
        dy: -30,
        ttl: 5,
    })
}
