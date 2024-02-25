export async function Bubble(array_size, divs, div_sizes, div_update, c_delay, delay_time) {

    for (var i = 0; i < array_size - 1; i++) {
        for (var j = 0; j < array_size - i - 1; j++) {
            div_update(divs[j], div_sizes[j], "yellow", c_delay, delay_time);

            if (div_sizes[j] > div_sizes[j + 1]) {
                div_update(divs[j], div_sizes[j], "red", c_delay, delay_time);
                div_update(divs[j + 1], div_sizes[j + 1], "red", c_delay, delay_time);

                var temp = div_sizes[j];
                div_sizes[j] = div_sizes[j + 1];
                div_sizes[j + 1] = temp;

                div_update(divs[j], div_sizes[j], "red", c_delay, delay_time);
                div_update(divs[j + 1], div_sizes[j + 1], "red", c_delay, delay_time);
            }
            div_update(divs[j], div_sizes[j], "blue", c_delay, delay_time);
        }
        div_update(divs[j], div_sizes[j], "green", c_delay, delay_time);
    }
    div_update(divs[0], div_sizes[0], "green", c_delay, delay_time);
}