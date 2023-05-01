function rgbToNamedColor(hex) {
    // Convert hex to rgb
    const [r, g, b] = [hex.slice(1, 3), hex.slice(3, 5), hex.slice(5, 7)].map(hex => parseInt(hex, 16));

    // Define the named colors
    const NAMED_COLORS = {
        'red': [255, 0, 0],
        'green': [0, 255, 0],
        'blue': [0, 0, 255],
        'black': [0, 0, 0],
        'white': [255, 255, 255],
        'yellow': [255, 255, 0],
        'orange': [255, 165, 0],
        'purple': [128, 0, 128],
        'grey': [128, 128, 128]
    };

    let closestColorName = null;
    let closestColorDistance = Infinity;

    for (const [colorName, [cr, cg, cb]] of Object.entries(NAMED_COLORS)) {
        const colorDistance = Math.sqrt((r - cr)**2 + (g - cg)**2 + (b - cb)**2);

        if (colorDistance < closestColorDistance) {
            closestColorName = colorName;
            closestColorDistance = colorDistance;
        }
    }

    return closestColorName;
}

window.addEventListener('DOMContentLoaded', (event) => {
    const clothingDiv = document.getElementById('suggested-clothing');
    const pred = clothingDiv.dataset.pred;
    const color = clothingDiv.dataset.color;

    // Convert the color from hex to named color
    const namedColor = rgbToNamedColor(color);

    // Parse the suggestions from the data-suggestions attribute
    const data = JSON.parse(clothingDiv.dataset.suggestions);

    const suggestion = data.find(item => item.clothing_type === pred && item.color === namedColor);

    if (suggestion) {
        const relatedClothing = suggestion.related_clothing.map(item => `${item.clothing_type} (${item.color})`).join(', ');
        clothingDiv.innerText = `Suggested clothing: ${relatedClothing}`;
    } else {
        clothingDiv.innerText = 'No suggested clothing found for this combination.';
    }
});

