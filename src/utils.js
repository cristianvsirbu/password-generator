export function getRandomChar(min, max) {
    const limit = max - min + 1;
    return String.fromCharCode(Math.floor(Math.random() * limit) + min);
}

export function getSymbol() {
    const symbol = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~'";
    return symbol[Math.floor(Math.random() * symbol.length)]
}