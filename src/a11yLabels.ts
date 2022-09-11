
const beforeAfterButton = (showAfterPic: boolean, bearTag?: number, bearName?: string) => {
    return `Show ${showAfterPic ? 'Before': 'After'} ${bearTag} ${bearName}`.trim();
}
const championPic = (bearTag?: number, bearName?: string) => {
    return `Champion Image ${bearTag} ${bearName}`.trim();
}

const pickBear = (bearTag?: number, bearName?: string) => {
    return `Pick ${bearTag} ${bearName}`.trim();
}

export const a11yLabels = {
    beforeAfterButton,
    championPic,
    pickBear
}