export async function bubbleSort(div_sizes, divs, updateVisuals, delay) {
    let len = divs.length;
    const sortedColor = "#00FF00";
    for (let i = 0; i < len; i++) {
        let isSwapped = false;
        for (let j = 0; j < (len - i - 1); j++) {
            updateVisuals(divs, div_sizes, j, j + 1, "compare");
            await new Promise(resolve => setTimeout(resolve, delay / 2)); // Delay for comparison visibility

            if (div_sizes[j] > div_sizes[j + 1]) {
                let temp = div_sizes[j];
                div_sizes[j] = div_sizes[j + 1];
                div_sizes[j + 1] = temp;

                updateVisuals(divs, div_sizes, j, j + 1, "swap");
                await new Promise(resolve => setTimeout(resolve, delay)); // Delay for swap visibility
                isSwapped = true;
            }
        }
        if (isSwapped) {
            updateVisuals(divs, div_sizes, len - i - 1, len - i - 1, "sorted");
        } else {
            break;
        }
    }
    divs.forEach(div => div.style.backgroundColor = sortedColor);
}