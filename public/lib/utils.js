function getRandomInt(max, min = 0) {
    return Math.round(Math.random() * (max - min) + min);
}

function getRandomItem(arr) {
    return arr[getRandomInt(arr.length - 1)];
}