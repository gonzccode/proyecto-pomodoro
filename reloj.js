let timeMinutes;
let timeSeconds;
let stateBtnTime = true;
let btnStart = document.querySelector("#btnStart");
let btnStop = document.querySelector("#btnStop");
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");
let success = document.getElementById("success");


btnStart.addEventListener("click", () => {
        timeMinutes = 24;
        timeSeconds = 59;

        minutes.innerHTML = timeMinutes;
        seconds.innerHTML = timeSeconds;

        let variationMinutes = setInterval(minutesTime, 60000);
        let variationSeconds = setInterval(secondsTime, 1000);

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

                    success.innerHTML = "¡Bien hecho! 💪 Toma un descanso 😴"

                }

                timeSeconds = 60;
            }
        }
    
})

btnStop.addEventListener("click", () => {
    timeMinutes = 25;
    timeSeconds = "00";

    minutes.innerHTML = timeMinutes;
    seconds.innerHTML = timeSeconds;
})


