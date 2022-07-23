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

document.addEventListener("DOMContentLoaded", () => {
        const start = () => {
            success.innerHTML = "";
            timeMinutes = "00";
            timeSeconds = 59;

            minutes.innerHTML = timeMinutes;
            seconds.innerHTML = timeSeconds;

            cont++

            if(cont>=2){
                clearInterval(variationMinutes);
                clearInterval(variationSeconds);
            }

            variationMinutes = setInterval(minutesTime, 60000);
            variationSeconds = setInterval(secondsTime, 1000);
            
        }

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
        
        const stop = () => {
            stateStop = true;

            timeMinutes = 25;
            timeSeconds = "00";

            clearInterval(variationMinutes);
            clearInterval(variationSeconds);

            minutes.innerHTML = timeMinutes;
            seconds.innerHTML = timeSeconds;
            
        }

        function minutesTime(){
            timeMinutes = timeMinutes - 1;
            if(timeMinutes >= 10){
                minutes.innerHTML = timeMinutes;
            } else {
                minutes.innerHTML = "0" + timeMinutes;
            }
        }

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
                    if(stateStop){
                        success.innerHTML = "¡Bien hecho! 💪 Toma un descanso 😴";
                        brake();
                        setTimeout(()=>{
                            timeMinutes = "00";
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
        btnStart.onclick = start;
        btnStop.onclick = stop;
})


