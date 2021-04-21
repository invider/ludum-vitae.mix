const alias = 'skillChart'

function onInstall() {
    this.skills = {}
}

function oneSkillUp(skill, points) {
    const currentPoints = this.skills[skill] || 0
    const resPoints = currentPoints + points
    if (resPoints > 0) {
        this.skills[skill] = resPoints
    }
}

function skillUp(skills) {
    if (!skills) return

    const skillChart = this
    Object.keys(skills).forEach(skill => {
        skillChart.oneSkillUp( skill, skills[skill] )
    })
}

function getSkills() {
    return this.skills
}
