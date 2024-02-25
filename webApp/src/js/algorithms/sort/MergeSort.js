import { enable_buttons } from './sorting.js'

export async function Merge(array_size, divs, div_sizes, div_update, delatTime, c_delay) {

    merge_partition(0, array_size - 1, divs, div_sizes, div_update, c_delay, delatTime);

    enable_buttons(c_delay, delatTime);
}

function merge_sort(start, mid, end, div_update, divs, div_sizes, c_delay, delayTime) {
    var p = start,
        q = mid + 1;

    var Arr = [],
        k = 0;

    for (var i = start; i <= end; i++) {
        if (p > mid) {
            Arr[k++] = div_sizes[q++];
            div_update(divs[q - 1], div_sizes[q - 1], "red", c_delay, delayTime);
        } else if (q > end) {
            Arr[k++] = div_sizes[p++];
            div_update(divs[p - 1], div_sizes[p - 1], "red", c_delay, delayTime);
        } else if (div_sizes[p] < div_sizes[q]) {
            Arr[k++] = div_sizes[p++];
            div_update(divs[p - 1], div_sizes[p - 1], "red"), c_delay, delayTime;
        } else {
            Arr[k++] = div_sizes[q++];
            div_update(divs[q - 1], div_sizes[q - 1], "red", c_delay, delayTime);
        }
    }

    for (var t = 0; t < k; t++) {
        div_sizes[start++] = Arr[t];
        div_update(divs[start - 1], div_sizes[start - 1], "green", c_delay, delayTime);
    }
}

function merge_partition(start, end, divs, div_sizes,div_update, c_delay, delayTime) {
    if (start < end) {
        var mid = Math.floor((start + end) / 2);
        div_update(divs[mid], div_sizes[mid], "yellow", c_delay, delayTime);

        merge_partition(start, mid, divs, div_sizes, div_update, c_delay, delayTime);
        merge_partition(mid + 1, end, divs, div_sizes, div_update, c_delay, delayTime);

        merge_sort(start, mid, end, div_update, divs, div_sizes, c_delay, delayTime);
    }
}
