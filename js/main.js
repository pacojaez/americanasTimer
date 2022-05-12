//Initialize all the variables from the DOM
let initTime = document.getElementById("initHour");
let endTime = document.getElementById("endHour");
let gameDuration = document.getElementById("gameDuration");
let date = document.getElementById("date");
let alarm = document.getElementById('alarmSound');
let nextMatchTime = document.getElementById("nextMatch");
let init = document.getElementById("init");
let initTitle = document.getElementById("initTitle");
let startBtn = document.getElementById("startBtn");
let settingArea = document.getElementById("settingArea");
let partialsGames = document.getElementById('partials');
let clockDisplay = document.getElementById("clock");
let reloadPage = document.getElementById('reloadPage');

// Set the date we're counting down to and the end of the game
let countDownDate = new Date();
let endGame = new Date();
//sets the audio Element
const audioElement = new Audio('material/alarm.mp3');
//initialize the array of partial games
let arrayGames = [];
//initialize the current hour to be displayed
let clock = new Date();


// Object with the init and cuntdown remaining time
class Countdown {

    constructor(time, expired = false) {
        this.time = time;
        this.expired = expired;
    }

    isExpired(time, now) {
        if (time < now)
            this.expired = true;
    }

    playSound() {

        let x = () => {
            audioElement.currentTime = 0;
            audioElement.play();

            setInterval(function() {

                if (audioElement.currentTime > 10) {

                    audioElement.pause();
                }
            }, 1000);
        }
        setTimeout(x, 1000);
    }

}

function start() {

    // hide the reloadPage if present
    reloadPage.classList.add('hidden');
    // generate the Date we are counting to
    countDownDate = new Date(date.value + " " + initTime.value);
    // get the finish time for the game
    endGame = new Date(date.value + " " + endTime.value);
    // get the milisecond of the dead line
    let resultado = countDownDate.getTime();
    // get the miliseconds of a partial game
    let gameDurationPartial = gameDuration.value * 1000 * 60;

    // check if we have all the values needed
    if (date.value == '' || initTime.value == '' || endTime.value == '' || gameDuration.value == '') {
        //shows a modal to the user to fill all the fields
        const modal = new Modal(
            // Grab the modal element
            document.querySelector('.modal'),
            // Grab the element that triggers the modal
            document.querySelector('[data-toggle="modal"]')
        );
        modal.open();
        return;
    }


    // disable the btn to avoid populate the countdown multiple times
    startBtn.disabled = true;
    // hide the form
    settingArea.classList.add('hidden');

    // create the Array with each partialGame end time
    for (let i = 0; i < 50; i++) {
        //check if the game is finish (never more than 50 partial games, usually 8 )
        if (resultado >= endGame.getTime()) {
            break;
        }
        // the first partial begin at the countdown time 
        if (i === 0) {
            resultado;
        } else {
            resultado += gameDurationPartial;
        }

        // create a new CountDown Object with the init of the Partial Game and expired set to false by default
        let newCountDown = new Countdown(resultado, false);
        arrayGames.push(newCountDown);

    }

    // get the last item from the PartialGames array
    let lastPartialGame = arrayGames[arrayGames.length - 1];

    if (endGame.getTime() < lastPartialGame.time) {
        endGame = new Date(lastPartialGame.time);
    }

    // print the result of iterate all the Partials Games, with messages to the user
    for (let e of arrayGames) {
        let date = new Date(e.time);

        let countDownDiv = document.createElement("div");
        // set a unique Id with the countdown attribute of the PartialGame
        countDownDiv.setAttribute('id', e.time);
        countDownDiv.classList.add('gameTime');

        let dateminutes = date.getMinutes();
        if (dateminutes < 10)
            dateminutes = "0" + date.getMinutes();

        countDownDiv.innerText = date.getHours() + ":" + dateminutes;
        partialsGames.appendChild(countDownDiv);

        let remainingTime = document.createElement("div");
        remainingTime.setAttribute('id', 'remainingTime' + e.time);
        remainingTime.className = "remainingTimeDiv";

        countDownDiv.appendChild(remainingTime);
    }

    // Interval to check if each countdown is finished and the remaining time to 
    const interval = setInterval(function() {
        // display the audio element that can be handled manually
        // alarm.setAttribute('style', 'display:block');

        // dont iterate the objects that expired is true
        const filteredArrayGames = arrayGames.filter(e => e.expired == false);
        // create a new instance of Date to display the actual hour
        let clock = new Date();
        let m = clock.getMinutes();
        if (m < 10)
            m = "0" + clock.getMinutes();

        let s = clock.getSeconds();
        if (s < 10)
            s = "0" + clock.getSeconds();


        clockDisplay.classList.remove('hidden');
        clockDisplay.innerHTML = "HORA ACTUAL: " + clock.getHours() + "h " + m + "m " + s + "s ";
        // Find the distance between now and the count down date
        var distance = countDownDate - clock.getTime();

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        //display the remainig time to the first partial game and the init of the game
        initTitle.classList.remove("hidden");
        initTitle.innerHTML = "INICIO AMERICANA EN: " + hours + "h " + minutes + "m " + seconds + "s ";
        init.classList.remove("hidden");
        // we need a clock with the actual time so here it is
        document.getElementById("clock").innerHTML = "HORA ACTUAL: " + clock.getHours() + ":" + m + ":" + s;
        //display the next matches to be played
        document.getElementById("nextMatchesTitle").classList.remove("hidden");
        // If the count down is finished and the game is begun, write some text
        if (distance < 0) {
            initTitle.innerHTML = "AMERICANA INICIADA";
        }

        // each Partial Game countdown
        for (let e of filteredArrayGames) {
            //difference between Partial Game dead line and actual time
            let date = new Date(e.time);
            let now = clock.getTime();
            let distance = date - now;
            let remainingTime = document.getElementById('remainingTime' + e.time);
            remainingTime.classList.add('digitHour');
            // Time calculations for days, hours, minutes and seconds to be displayed correctly
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (hours > 0) {
                hours = hours + "h ";
            } else {
                hours = "";
            }

            if (minutes < 10)
                minutes = "0" + minutes;

            if (seconds < 10)
                seconds = "0" + seconds;


            e.isExpired(e.time, now);
            // Display the result in the element with id="remainingTime+e.time"
            remainingTime.innerHTML = hours + minutes + "m " + seconds + "s";
            // console.log('Is expired: ' + e.expired + '---time: ' + e.time + ' ----clocktime: ' + clock.getTime());
            //when we get the countdown change the message and the background
            if (e.expired) {
                remainingTime.innerHTML = "FINALIZADO";
                remainingTime.classList.add('bg-ended');
            }
            //trigger the alarm between -1 seg and 0 seg to avoid each second to be triggered
            if (distance >= -1000 && distance <= 0) {
                e.playSound();
            }
        }

        // If the the game is finished, write some text and ends the interval
        if (clock.getTime() > endGame.getTime()) {
            initTitle.innerHTML = "AMERICANA FINALIZADA";
            document.getElementById("clock").classList.add('hidden');
            reloadPage.classList.remove('hidden');
            clearInterval(interval);
        }

    }, 1000);

}