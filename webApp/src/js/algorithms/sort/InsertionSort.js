import { enable_buttons } from './sorting.js'

export async function Insertion(divs, div_sizes, array_size, div_update, delayTime) {

    var c_delay = 0;

    for (var j = 0; j < array_size; j++) {
        div_update(divs[j], div_sizes[j], "yellow", c_delay, delayTime);

        var key = div_sizes[j];
        var i = j - 1;
        while (i >= 0 && div_sizes[i] > key) {
            div_update(divs[i], div_sizes[i], "red", c_delay, delayTime);
            div_update(divs[i + 1], div_sizes[i + 1], "red"), c_delay, delayTime;

            div_sizes[i + 1] = div_sizes[i];

            div_update(divs[i], div_sizes[i], "red", c_delay, delayTime);
            div_update(divs[i + 1], div_sizes[i + 1], "red", c_delay, delayTime);

            div_update(divs[i], div_sizes[i], "blue");
            if (i == (j - 1)) {
                div_update(divs[i + 1], div_sizes[i + 1], "yellow", c_delay, delayTime);
            } else {
                div_update(divs[i + 1], div_sizes[i + 1], "blue", c_delay, delayTime);
            }
            i -= 1;
        }
        div_sizes[i + 1] = key;

        for (var t = 0; t < j; t++) {
            div_update(divs[t], div_sizes[t], "green", c_delay, delayTime);
        }
    }
    div_update(divs[j - 1], div_sizes[j - 1], "green", c_delay, delayTime);

    enable_buttons(c_delay, delayTime)

}