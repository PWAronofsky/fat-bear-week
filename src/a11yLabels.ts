
const beforeAfterButton = (showAfterPic: boolean, bearTag?: number, bearName?: string) => {
    return `Show ${showAfterPic ? 'Before': 'After'} ${bearTag} ${bearName}`.trim();
}

const pickBear = (bearTag?: number, bearName?: string) => {
    return `Pick ${bearTag} ${bearName}`.trim();
}

export const a11yLabels = {
    beforeAfterButton,
    pickBear
}