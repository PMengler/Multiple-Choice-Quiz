var timerEl = document.getElementById("countdown");
var startEl = document.getElementById("startQuiz");

// Timer that counts down from 60 seconds to 0
function countdown() {
    var timeLeft = 60;

    var timeInterval = setInterval(function() {
    if (timeLeft > 1) {
        timerEl.textContent = 'Time Left: ' + timeLeft + ' seconds remaining';
        // Decrements 'timeLeft' by 1
        timeLeft--;
    } else if (timeLeft >= 0) {
        timerEl.textContent = 'Time Left: ' + timeLeft + ' second remaining';
        timeLeft--;
    } else {
        timerEl.textContent = 'Time is up!'
        clearInterval(timeInterval);
        // alert(score);
    }
}, 1000)
};

// initiates the timer to start countdown
startEl.addEventListener("click", function() {
    countdown();
});