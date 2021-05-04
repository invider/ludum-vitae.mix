const FENCE_STEP = 64

function setupLV() {
    const lv = _.lv.main
    const mob = lab.cam.mob

    let baseW = 640
    let baseH = 640
    let baseX = 200
    let baseY = 400

    function createSection(section, i) {

        mob.spawn( dna.prop.Sign, {
            x: baseX,
            y: baseY,
            dx: -10,
            label: section.name,
            img: res.signRight,
        })

        // build the outer fence
        lib.gen.fence.horizontal(baseX - baseW, baseY - baseH/2, baseW/FENCE_STEP)
        lib.gen.fence.horizontal(baseX - baseW, baseY + baseH/2, baseW/FENCE_STEP)
        if (i === 0) {
            // the first section
            const preX = baseX + baseW
            lib.gen.fence.horizontal(preX - baseW, baseY - baseH/2, baseW/FENCE_STEP)
            lib.gen.fence.horizontal(preX - baseW, baseY + baseH/2, baseW/FENCE_STEP)

            lib.gen.fence.vertical(preX, baseY - baseH/2 + FENCE_STEP, baseH/FENCE_STEP - 1)
            lib.gen.fence.corner(preX, baseY - baseH/2, 'top-right')
            lib.gen.fence.corner(preX, baseY + baseH/2, 'bottom-right')

        } else if (i === lv.ls.length - 1) {
            // the last section
            const lastX = baseX - baseW - FENCE_STEP
            lib.gen.fence.vertical(lastX, baseY - baseH/2 + FENCE_STEP, baseH/FENCE_STEP - 1)
            lib.gen.fence.corner(lastX, baseY - baseH/2, 'top-left')
            lib.gen.fence.corner(lastX, baseY + baseH/2, 'bottom-left')
        }

        baseX -= baseW
    }

    lv.ls.forEach( (section, i) => createSection(section, i) )
}
setupLV.Z = 12
