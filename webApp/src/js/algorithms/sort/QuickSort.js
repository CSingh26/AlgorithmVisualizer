import { enable_buttons } from "./sorting.js";

export async function Quick(array_size, divs, div_sizes, div_update, c_delay, delay_time) {

    quick_sort(0, array_size - 1, divs, div_sizes, div_update, c_delay, delay_time);

    enable_buttons(c_delay, delay_time);
}

function quick_partition(start, end, divs, div_sizes, div_update, c_delay, delay_time) {
    var i = start + 1;
    var piv = div_sizes[start];
    div_update(divs[start], div_sizes[start], "yellow", c_delay, delay_time);

    for (var j = start + 1; j <= end; j++) {

        if (div_sizes[j] < piv) {
            div_update(divs[j], div_sizes[j], "yellow", c_delay, delay_time);

            div_update(divs[i], div_sizes[i], "red", c_delay, delay_time);
            div_update(divs[j], div_sizes[j], "red", c_delay, delay_time);

            var temp = div_sizes[i];
            div_sizes[i] = div_sizes[j];
            div_sizes[j] = temp;

            div_update(divs[i], div_sizes[i], "red", c_delay, delay_time);
            div_update(divs[j], div_sizes[j], "red", c_delay, delay_time);

            div_update(divs[i], div_sizes[i], "blue", c_delay, delay_time);
            div_update(divs[j], div_sizes[j], "blue", c_delay, delay_time);

            i += 1;
        }
    }
    div_update(divs[start], div_sizes[start], "red", c_delay, delay_time);
    div_update(divs[i - 1], div_sizes[i - 1], "red", c_delay, delay_time);

    var temp = div_sizes[start];
    div_sizes[start] = div_sizes[i - 1];
    div_sizes[i - 1] = temp;

    div_update(divs[start], div_sizes[start], "red", c_delay, delay_time);
    div_update(divs[i - 1], div_sizes[i - 1], "red", c_delay, delay_time);

    for (var t = start; t <= i; t++) {
        div_update(divs[t], div_sizes[t], "green", c_delay, delay_time);
    }

    return i - 1;
}

function quick_sort(start, end, divs, div_sizes, div_update, c_delay, delay_time) {
    if (start < end) {
        var piv_pos = quick_partition(start, end, divs, div_sizes, div_update, c_delay, delay_time);
        quick_sort(start, piv_pos - 1, divs, div_sizes, div_update, c_delay, delay_time);
        quick_sort(piv_pos + 1, end, divs, div_sizes, div_update, c_delay, delay_time);
    }
}