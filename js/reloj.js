let timeMinutes;
let timeSeconds;
let stateBtnTime = true;
let stateStart = true;
let stateStop = true;
let cont = 0;
let variationMinutes;
let variationSeconds;
let btnStart = document.querySelector("#btnStart");
let btnStop = document.querySelector("#btnStop");
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");
let success = document.getElementById("success");


//evento que se ejecuta cuando se ha cargado por completo el DOM
document.addEventListener("DOMContentLoaded", () => {
        //funcion que inicia el reloj pomodoro
        const start = () => {
            success.innerHTML = "";
            timeMinutes = "24";
            timeSeconds = 59;

            minutes.innerHTML = timeMinutes;
            seconds.innerHTML = timeSeconds;

            //contador para saber el numero de clicks
            cont++

            //if si se da mas de 2 click para limpiar los interval
            if(cont>=2){
                clearInterval(variationMinutes);
                clearInterval(variationSeconds);
            }

            //intervalo que hará los minutos y segundos
            variationMinutes = setInterval(minutesTime, 60000);
            variationSeconds = setInterval(secondsTime, 1000);
            
        }

        //funcion para el tiempo de descanso
        const brake = () => {
            stateStop = false
            timeMinutes = "05";
            timeSeconds = "00";
            minutes.innerHTML = timeMinutes;
            seconds.innerHTML = timeSeconds;

            clearInterval(variationMinutes);
            clearInterval(variationSeconds);

            variationMinutes = setInterval(minutesTime, 60000);
            variationSeconds = setInterval(secondsTime, 1000);
        }
        
        //funcion para detener el reloj y comenzar desde el inicio
        const stop = () => {
            stateStop = true;

            timeMinutes = 25;
            timeSeconds = "00";

            clearInterval(variationMinutes);
            clearInterval(variationSeconds);

            minutes.innerHTML = timeMinutes;
            seconds.innerHTML = timeSeconds;
        }

        //funcion que reduce los minutos de reloj
        function minutesTime(){
            timeMinutes = timeMinutes - 1;
            if(timeMinutes >= 10){
                minutes.innerHTML = timeMinutes;
            } else {
                minutes.innerHTML = "0" + timeMinutes;
            }
        }

        //funcion que reduce los segundos
        function secondsTime(){
            timeSeconds = timeSeconds - 1;

            if(timeSeconds  >= 10) {
                seconds.innerHTML = timeSeconds;
            } else {
                seconds.innerHTML = "0" + timeSeconds;
            }

            if(timeSeconds <= 0){
                if(timeMinutes <= 0){
                    clearInterval(variationMinutes);
                    clearInterval(variationSeconds);
                    //este if sirve para que solo se active cuando sea el tiempo del brave sino se para el tiempo y comienza de nuevo
                    if(stateStop){
                        success.innerHTML = "¡Bien hecho! 💪 Toma un descanso 😴";
                        brake();
                        setTimeout(()=>{
                            timeMinutes = "04";
                            timeSeconds = 59;
                            minutes.innerHTML = timeMinutes;
                            seconds.innerHTML = timeSeconds;
                        },1000);
                    } else {
                        success.innerHTML = "";
                        stop();
                    }
                }
                timeSeconds = 60;
            }
        }

        //eventos cuando se da click en el boton de empezar (verde) y parar (rojo)
        btnStart.onclick = start;
        btnStop.onclick = stop;
})


