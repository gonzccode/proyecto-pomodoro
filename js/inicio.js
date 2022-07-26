arrayTask = [];
let nameUser;
let task;
let inputTask = document.getElementById("inputTask");
let btnTask = document.getElementById("btnTask");
let newTask;
let otherTask;
let listT = document.getElementById("listTask");
let hello = document.getElementById("helloUser");
let dateDiv = document.querySelector("#date");
let dateTime = luxon.DateTime;
let dateNow = dateTime.now();
let divPhrase = document.querySelector("#phrase")
let arrayPhrases = []

// clase para crear la tarea cuando se agrega una nueva
class Task {
    constructor(id, user, task, state) {
        this.id = id
        this.user = user
        this.task = task
        this.state = state
    }
}

//llamo al valor de user del localStorae y lo almaceno en la variable y luego adiciono en el HTML la etiqueta h5
nameUser = localStorage.getItem("user");
hello.innerHTML = `<h5> <strong> Bienvenido ${nameUser} 👋, escribe tus tareas. ✍  </strong></h5>`;

//que al cargar la pagina, dispare la funcion listak
window.onload = function () {
    listTask();
}

//evento que se activa cuando se escribe en el campo de tarea
inputTask.addEventListener("input", () => {
    task = inputTask.value;
})

//evento que se activa cuando se da click en el boton Agregar
//el estado de la tarea será 0 (terminado) y 1 (activo)
btnTask.addEventListener("click", addTask);

//funcion para agregar la tarea cuando se da click en el boton AGREGAR
function addTask() {
    const numberTask = parseInt(Math.random() * 100);
    if (arrayTask.length !== 0) {
        let vNumber = false;
        for (element of arrayTask) {
            //Destructuración de element para id
            const {id} = element;
            if (numberTask == id) {
                vNumber = true;
                break
            } else {
                vNumber = false;
            }
        }

        if (vNumber) {
            addTask();
        } else {
            newTask = new Task(numberTask, nameUser, task, 1);
            arrayTask.push(newTask);
            task = "";
            localStorage.setItem("tasks-"+nameUser,JSON.stringify(arrayTask));
            listTask();
        }

    } else {
        newTask = new Task(numberTask, nameUser, task, 1);
        arrayTask.push(newTask);
        task = "";
        localStorage.setItem("tasks-"+nameUser,JSON.stringify(arrayTask));
        listTask();
    }
}

//funcion que lista en el HTML recorriendo ARRAYTASK
const listTask = () => {
    listT.innerHTML = "";
    if(localStorage.getItem("tasks-"+nameUser)){
        arrayTask = JSON.parse(localStorage.getItem("tasks-"+nameUser));
        arrayTask = arrayTask.filter( t => t.user == nameUser)
    }

    for (element of arrayTask) {
        const taskL = document.createElement("li");
        //Destructuración de element para id, task, state
        const {id, task, state} = element;
        taskL.id = "task-" + id;
        //Operador ternario para igualar la clase segun el estado
        taskL.className = state == 1 ? "black-text" : "green-text"
        taskL.innerHTML += `
        <p> <strong> ${task} </strong></p>
        <button type="button" id="${id}" class="btn btn-outline-success" data="done"><i class="bi bi-check-circle-fill"></i> Finalizado</button>
        <button type="button" id="${id}" class="btn btn-outline-danger" data="delete"><i class="bi bi-trash-fill"></i> Eliminar</button>
        `;
        listT.append(taskL);
        inputTask.value = "";
    }
}

//evento que se activa cuando se da click en el Div listasl, agarrando el valor de esa tarea y 
//luego escogiendo entre la funcion done y delete
listT.addEventListener("click", function (e) {
    const element = e.target;
    const elementId = parseInt(element.id);
    //@ts-ignore
    const elementData = element.attributes.data.value;
    if (elementData == "done") {
        doneTask(elementId);
        //sweet-alert cuando se termina la tarea
        Swal.fire({
            icon: 'success',
            title: 'Tarea terminada',
            showConfirmButton: false,
            timer: 1500,
            heightAuto: false
        });
    } else if (elementData == "delete") {
        deleteTask(elementId);
        //sweet-alert cuando se elimina la tarea
        Swal.fire({
            icon: 'error',
            title: 'Tarea eliminada',
            showConfirmButton: false,
            timer: 1500,
            heightAuto: false
        });
    }
})

//funcion para marcar como realizado la tarea, agregando la clase green-text
function doneTask(id) {
    const classDone = document.getElementById("task-" + id);
    classDone.className = "green-text";
    for (v of arrayTask){
        //Operador ternario para dar valor al estado de la tarea
        v.state = v.id == id ?  0 : v.state;
    }
    localStorage.setItem("tasks-"+nameUser,JSON.stringify(arrayTask));
}

//funcion para eliminar la tarea escogida
function deleteTask(id) {
    arrayTask = arrayTask.filter((item) => item.id !== id);
    localStorage.setItem("tasks-"+nameUser,JSON.stringify(arrayTask));
    listTask();
}

//funcion para la fecha
const dateFunction = () => {
    //se utilizo la libreria luxon para fechas
    let d = dateNow.setLocale('es').toLocaleString(dateTime.DATE_HUGE);
    let dateExtend = d.charAt(0).toUpperCase() + d.slice(1);
    dateDiv.innerHTML += `<p><strong>${dateExtend}</strong></p>`;
   
}

dateFunction()

//llamando al archivo json para mostrar las frases
const getPhrases = () => {
    fetch('frases.json')
    .then(response => response.json())
    .then(data => {
            arrayPhrases = data;
            //obteniendo un numero entre 1 y 41
            const numberRandom = Math.round(Math.random()*(41-1) + 1);
            divPhrase.innerHTML = "";
            const textPhrase = document.createElement("p");
            const {phrase, author} = arrayPhrases[numberRandom];
            textPhrase.innerHTML = `<strong>${phrase}</strong> - ${author}`;
            divPhrase.append(textPhrase);
        })
    .catch((error) => {
        console.error("Se produjo un error: ",error);
    })
}

//este evento se activa cuando la pagina esté cargada, setTimeout para mostrar la primera frase 
//setInterval es para que se carga una frase cada cierto tiempo
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        getPhrases();
    }, 3000);
})

document.addEventListener("DOMContentLoaded", () => {
    setInterval(() => {
        getPhrases();
    }, 30000);
})







