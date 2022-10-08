let startBtn = document.querySelector('#startBtn');
let pauseBtn = document.querySelector('#pauseBtn');
let resetBtn = document.querySelector('#resetBtn');

let setBtn = document.querySelector('#setBtn');
let timeIn = document.querySelector('#time');
let timerDisplay  = document.querySelector('#timer');

let volumeIn = document.querySelector('#volumeSlider');
volumeIn.value = 5
let volumeDisplay = document.querySelector('#volumeDisplay');
let volume = parseInt(volumeIn.value);

let audioIn = document.querySelector('#audioSlider')
audioIn.value = 1
let audioChoice = document.querySelector('#audioChoiceDisplay');
let selectAudio = parseInt(audioIn.value)

var audio = new Audio(`./sounds/audio${selectAudio}.mp3`);
audio.loop = 1;

var timer;

let min = 0;
let sec = 0;
let time = 0;
let storageTime;
let startedTimer = false;

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
    if (timeIn.value >= 0) {
        time = timeIn.value * 60;
        storageTime = timeIn.value * 60;
    
        displayTimer(time);
        pauseTimer()
        
        timeIn.value = 0;
    }
};

function startTimer() {
    if (time > 0 && startedTimer == false) {
        timer = setInterval(() => {
            startedTimer = true;
            time--; 
            displayTimer(time)
            if (time == 0) {
            audio.play();
            clearInterval(timer);
            }
        }, 1000)
    }
}

function pauseTimer() {
    startedTimer = false;
    clearInterval(timer)
    displayTimer(time)
}

function reset() {
    startedTimer = false;
    time = storageTime;
    audio.load();
    clearInterval(timer);
    displayTimer(time);
}

function displayVolume() {
    volumeDisplay.innerHTML = 'Volume: ' + volume;
}

function updateVolume() {
    volume = this.value;
    audio.volume = volume / 10;
    displayVolume()
}

function displayAudioChoice() {
    audioChoice.innerHTML = 'Audio:' + selectAudio
}

function updateAudio() {
    selectAudio = this.value;
    audio = new Audio(`./sounds/audio${selectAudio}.mp3`)
    audio.loop = 1;
    displayAudioChoice()
}

window.onload = () => {
    setBtn.onclick = getTime;
    startBtn.onclick = startTimer;
    pauseBtn.onclick = pauseTimer;
    resetBtn.onclick = reset;
    volumeIn.oninput = updateVolume;
    audioIn.oninput = updateAudio;
    timeIn.addEventListener('keydown', (e) => {
        if( e.code == 'NumpadEnter') {
            getTime()
        }
    })

    displayTimer(time);
    displayVolume();
    displayAudioChoice();
}