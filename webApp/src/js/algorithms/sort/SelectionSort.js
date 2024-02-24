export async function selectionSort(div_sizes, divs, updateVisuals, delay) {
    let n = div_sizes.length;
    const sortedColor = "#00FF00";
    for (let i = 0; i < n - 1; i++) {
        let min_idx = i;
        for (let j = i + 1; j < n; j++) {
            // Highlight the current and min elements being compared
            updateVisuals(divs, div_sizes, j, min_idx, "compare");
            await new Promise(resolve => setTimeout(resolve, delay));

            if (div_sizes[j] < div_sizes[min_idx]) {
                min_idx = j; // Update min_idx to the new minimum element's index
            }
        }
        // Swap if the minimum is not the position i
        if (min_idx !== i) {
            let temp = div_sizes[i];
            div_sizes[i] = div_sizes[min_idx];
            div_sizes[min_idx] = temp;
            
            // Visual update for the swap
            updateVisuals(divs, div_sizes, i, min_idx, "swap");
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    divs.forEach(div => div.style.backgroundColor = sortedColor);
}
