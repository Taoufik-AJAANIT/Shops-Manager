// now it just returns 2 rondom numbers x & y but after it can fetch google map api or ...
const getPosition = () => {

    return {
        x: Math.floor(Math.random() * 20) + 1,
        y: Math.floor(Math.random() * 20) + 1
    }
}

module.exports = getPosition; 