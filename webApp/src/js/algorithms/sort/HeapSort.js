export async function Heap(divs, div_sizes, array_size, div_update, c_delay, delay_time) {

    heap_sort(array_size, div_update, divs, div_sizes, c_delay, delay_time);
}

function swap(i, j, divs, div_sizes, div_update, c_delay, delay_time) {
    div_update(divs[i], div_sizes[i], "red", c_delay, delay_time);
    div_update(divs[j], div_sizes[j], "red", c_delay, delay_time);

    var temp = div_sizes[i];
    div_sizes[i] = div_sizes[j];
    div_sizes[j] = temp;

    div_update(divs[i], div_sizes[i], "red", c_delay, delay_time);
    div_update(divs[j], div_sizes[j], "red", c_delay, delay_time);

    div_update(divs[i], div_sizes[i], "blue", c_delay, delay_time);
    div_update(divs[j], div_sizes[j], "blue", c_delay, delay_time);
}

function max_heapify(n, i, div_sizes, div_update, divs, c_delay, delay_time) {
    var largest = i;
    var l = 2 * i + 1;
    var r = 2 * i + 2;

    if (l < n && div_sizes[l] > div_sizes[largest]) {
        if (largest != i) {
            div_update(divs[largest], div_sizes[largest], "blue", c_delay, delay_time);
        }

        largest = l;

        div_update(divs[largest], div_sizes[largest], "red", c_delay, delay_time);
    }

    if (r < n && div_sizes[r] > div_sizes[largest]) {
        if (largest != i) {
            div_update(divs[largest], div_sizes[largest], "blue", c_delay, delay_time);
        }

        largest = r;

        div_update(divs[largest], div_sizes[largest], "red", c_delay, delay_time);
    }

    if (largest != i) {
        swap(i, largest, divs, div_sizes, div_update, c_delay, delay_time);

        max_heapify(n, largest, div_sizes, div_update, divs, c_delay, delay_time);
    }
}

function heap_sort(array_size, div_update, divs, div_sizes, c_delay, delay_time) {
    for (var i = Math.floor(array_size / 2) - 1; i >= 0; i--) {
        max_heapify(array_size, i, div_sizes, div_update, divs);
    }

    for (var i = array_size - 1; i > 0; i--) {
        swap(0, i, divs, div_sizes, div_update, c_delay, delay_time);
        div_update(divs[i], div_sizes[i], "green", c_delay, delay_time);
        div_update(divs[i], div_sizes[i], "yellow", c_delay, delay_time);

        max_heapify(i, 0, div_sizes, div_update, divs, c_delay, delay_time);

        div_update(divs[i], div_sizes[i], "blue", c_delay, delay_time);
        div_update(divs[i], div_sizes[i], "green", c_delay, delay_time);
    }
    div_update(divs[i], div_sizes[i], "green", c_delay, delay_time);
}