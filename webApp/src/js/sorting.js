document.querySelectorAll(".options button").forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll(".options button").forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
    });
});

let array_size; 
let div_sizes = []; 
let divs = []; 
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

