const audio1 = new Audio('./sounds/audio1.mp3');
audio1.loop = 1;

let startBtn = document.querySelector('#startBtn');
let pauseBtn = document.querySelector('#pauseBtn');
let resetBtn = document.querySelector('#resetBtn');

let setBtn = document.querySelector('#setBtn');
let timeIn = document.querySelector('#time');
let timerDisplay  = document.querySelector('#timer');

var timer;

let min = 0;
let sec = 0;
let time = 0;
let storageTime;

sec = formatSec(sec);
min = formatMin(min);

function formatMin(min) {
    min = min < 10 ? '0' + min : min;
    return min
};

function formatSec(sec) {
    sec = sec < 10 ? '0' + sec : sec;
    return sec
};

function displayTimer(time) {
    min = parseInt(time / 60,10);
    sec = parseInt(time % 60,10);
    min = formatMin(min);
    sec = formatSec(sec);
    
    timerDisplay.innerHTML = min + ':' + sec;
};

function getTime() {
    time = timeIn.value * 60;
    storageTime = timeIn.value * 60;

    displayTimer(time);
    
    timeIn.value = 0;
};

function decreseTime() {
    if (time > 0) {
        timer = setInterval(() => {
            time--;

            displayTimer(time)

            if (time == 0) {
            audio1.play();
            clearInterval(timer);
            }
        }, 1000)
    }
}

function pauseTimer() {
    clearInterval(timer)
    displayTimer(time)
}

function reset() {
    audio1.load();
    clearInterval(timer);
    time = storageTime;
    displayTimer(time);
}

window.onload = () => {
    setBtn.onclick = getTime;
    startBtn.onclick = decreseTime;
    pauseBtn.onclick = pauseTimer;
    resetBtn.onclick = reset;

    displayTimer(time);
}