import { enable_buttons } from "./sorting.js";

export async function Selection(array_size, divs, div_sizes, div_update, c_delay, delay_time) {
    
    var index_min;
    for (var i = 0; i < array_size - 1; i++) {
        div_update(divs[i], div_sizes[i], "red". c_delay, delay_time);

        index_min = i;

        for (var j = i + 1; j < array_size; j++) {
            div_update(divs[j], div_sizes[j], "yellow", c_delay, delay_time);

            if (div_sizes[j] < div_sizes[index_min]) {
                if (index_min != i) {
                    div_update(divs[index_min], div_sizes[index_min], "blue", c_delay, delay_time);
                }
                index_min = j;
                div_update(divs[index_min], div_sizes[index_min], "red", c_delay, delay_time);
            } else {
                div_update(divs[j], div_sizes[j], "blue");
            }
        }

        if (index_min != i) {
            var temp = div_sizes[index_min];
            div_sizes[index_min] = div_sizes[i];
            div_sizes[i] = temp;

            div_update(divs[index_min], div_sizes[index_min], "red");
            div_update(divs[i], div_sizes[i], "red");
            div_update(divs[index_min], div_sizes[index_min], "blue");
        }
        div_update(divs[i], div_sizes[i], "green", c_delay, delay_time);
    }
    div_update(divs[i], div_sizes[i], "green", c_delay, delay_time);

    enable_buttons(c_delay, delay_time);
}