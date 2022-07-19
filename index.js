let userName;
let warningName = document.querySelector("#warningName");
let inputUser = document.querySelector("#inputUser");
let btnUser = document.getElementById("btnUser");

//se valida si se encuentra registro del usuario en localStorage
if(localStorage.getItem("user")){
    inputUser.value = localStorage.getItem("user");
}

//evento que se activa cuando se escribe en el campo de nombre
inputUser.addEventListener("input", () => {
    userName = inputUser.value;
})

//evento que se activa cuando se le da Click al boton ingresar
btnUser.addEventListener("click", function () {
    userName = inputUser.value;
    localStorage.setItem("user", userName);
})

