import {
    bubbleSort
} from './BubbleSort.js';
import { selectionSort } from './SelectionSort.js';
let currentAlgorithm;

document.querySelectorAll(".options button").forEach(button => {
    button.addEventListener('click', function () {
        document.querySelectorAll(".options button").forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        currentAlgorithm = this.getAttribute('data-aglo');
    });
});

let array_size;
let div_sizes = [];
let divs = [];
let margin_size
const cont = document.getElementById("sorting-visualizer");
const inp_as = document.getElementById("elementRange");

function generate_array() {
    cont.innerHTML = "";

    for (var i = 0; i < array_size; i++) {
        div_sizes[i] = Math.floor(Math.random() * 0.5 * (inp_as.max - inp_as.min)) + 10;
        divs[i] = document.createElement("div");
        margin_size = 0.1;
        divs[i].style = " margin:0% " + margin_size + "%; background-color:blue; width:" + (100 / array_size - (2 * margin_size)) + "%; height:" + div_sizes[i] + "%;";
        cont.appendChild(divs[i]);
    }
}

function update_array_size() {
    array_size = inp_as.value;
    generate_array();
}

inp_as.addEventListener("input", update_array_size);

window.onload = update_array_size();
var speed = 1000

function updateVisuals(divs, div_sizes, index1, index2, action) {
    const compareColor = "#FFA500"; 
    const swapColor = "#FF0000"; 
    const sortedColor = "#00FF00"; 
    const defaultColor = "#0008080"; 

    if (action === "compare") {
        divs[index1].style.backgroundColor = compareColor;
        divs[index2].style.backgroundColor = compareColor;
    } else if (action === "swap") {
        let tempHeight = divs[index1].style.height;
        divs[index1].style.height = divs[index2].style.height;
        divs[index2].style.height = tempHeight;

        divs[index1].style.backgroundColor = swapColor;
        divs[index2].style.backgroundColor = swapColor;
    }

    setTimeout(() => {
        if (action !== "sorted") {
            divs[index1].style.backgroundColor = defaultColor;
            divs[index2].style.backgroundColor = defaultColor;
        }
    }, 50); 
}

document.getElementById('sort').addEventListener('click', async function () {
    switch (currentAlgorithm) {
        case 'bubbleSort':
            await bubbleSort(div_sizes, divs, updateVisuals, getDelayTime(speed.value));
            break;
        case 'selectionSort':
            await selectionSort(div_sizes, divs, updateVisuals, getDelayTime(speed.value))
            break;
        case 'quickSort':
            break;
        case 'insertionSort':
            break;
        case 'heapSort':
            break;
        case "mergeSort":
            break;
        default:
            console.log('No sorting algorithm selected');
    }
});

function getDelayTime(speedVal) {
    10000/(Math.floor(array_size/10)*speedVal)
}