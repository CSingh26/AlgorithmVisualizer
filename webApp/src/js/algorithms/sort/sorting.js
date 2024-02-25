import { Bubble } from './BubbleSort.js';
import { Heap } from './HeapSort.js'
import { Insertion } from './InsertionSort.js'
import { Merge } from './MergeSort.js'
import { Selection } from './SelectionSort.js';
import { Quick } from './QuickSort.js';

var inp_as = document.getElementById('elementRange'),
    array_size = inp_as.value;
var inp_gen = document.getElementById("genArr");
var inp_aspeed = document.getElementById("speedRange");

var butts_algos = document.querySelectorAll(".options button");

var div_sizes = [];
var divs = [];
var margin_size;
var cont = document.getElementById("sorting-visualizer");
cont.style = "flex-direction:row";

inp_gen.addEventListener("click", generate_array);
inp_as.addEventListener("input", update_array_size);

function generate_array() {
    cont.innerHTML = "";

    for (var i = 0; i < array_size; i++) {
        div_sizes[i] = Math.floor(Math.random() * 0.5 * (inp_as.max - inp_as.min)) + 10;
        divs[i] = document.createElement("div");
        cont.appendChild(divs[i]);
        margin_size = 0.1;
        divs[i].style = " margin:0% " + margin_size + "%; background-color:blue; width:" + (100 / array_size - (2 * margin_size)) + "%; height:" + (div_sizes[i]) + "%;";
    }
}

function update_array_size() {
    array_size = inp_as.value;
    generate_array();
}

window.onload = update_array_size();

for (var i = 0; i < butts_algos.length; i++) {
    butts_algos[i].addEventListener("click", runalgo);
}

function disable_buttons() {
    for (var i = 0; i < butts_algos.length; i++) {
        butts_algos[i].classList = [];
        butts_algos[i].classList.add("butt_locked");

        butts_algos[i].disabled = true;
        inp_as.disabled = true;
        inp_gen.disabled = true;
        inp_aspeed.disabled = true;
    }
}

function runalgo() {
    disable_buttons();

    this.classList.add("butt_selected");
    switch (this.innerHTML) {
        case "Bubble Sort":
            Bubble(array_size, divs, div_sizes, div_update, c_delay, delay_time);
            enable_buttons(c_delay, delay_time)
            break;
        case "Selection Sort":
            Selection(array_size, divs, div_sizes, div_update, c_delay, delay_time);
            break;
        case "Insertion Sort":
            Insertion(divs, div_sizes, array_size, div_update, delay_time);
            break;
        case "Merge Sort":
            Merge(array_size, divs, div_sizes, div_update, delay_time, c_delay);
            break;
        case "Quick Sort":
            Quick(array_size, divs, div_sizes, div_update, c_delay, delay_time);
            break;
        case "Heap Sort":
            Heap(divs, div_sizes, array_size, div_update, c_delay, delay_time);
            enable_buttons(c_delay, delay_time)
            break;
    }
}

var speed = 1000;

inp_aspeed.addEventListener("input", vis_speed);

function vis_speed() {
    var array_speed = inp_aspeed.value;
    switch (parseInt(array_size, divs, div_sizes, div_update)) {
        case 1:
            speed = 1;
            break;
        case 2:
            speed = 10;
            break;
        case 3:
            speed = 100;
            break;
        case 4:
            speed = 1000;
            break;
        case 5:
            speed = 10000;
            break;
    }

    delay_time = 10000 / (Math.floor(array_size / 10) * speed);
}

var delay_time = 10000 / (Math.floor(array_size / 10) * speed);
var c_delay = 0;

function div_update(cont, height, color, c_delay, delay_time) {
    window.setTimeout(function () {
        cont.style = " margin:0% " + margin_size + "%; width:" + (100 / array_size - (2 * margin_size)) + "%; height:" + height + "%; background-color:" + color + ";";
    }, c_delay += delay_time);
}

export async function enable_buttons(c_delay, delay_time) {
    window.setTimeout(function () {
        for (var i = 0; i < butts_algos.length; i++) {
            butts_algos[i].classList = [];
            butts_algos[i].classList.add("butt_unselected");

            butts_algos[i].disabled = false;
            inp_as.disabled = false;
            inp_gen.disabled = false;
            inp_aspeed.disabled = false;
        }
    }, c_delay += delay_time);
}