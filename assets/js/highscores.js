const scoreDiv = document.getElementById("scoreContainer");
const restartEl = document.getElementById("restart");
const clearEl = document.getElementById("clear");

let score = 0;
let scorePerCent = 0;
var name = localStorage.getItem("name", name);
var highscores = [localStorage.getItem("name", name), localStorage.getItem("score", score)];

function updateScore(score) {
    localStorage.getItem("score", score);
    scoreDiv.innerText = score;
}

function printHighscores() {
    localStorage.setItem("highscores", JSON.stringify(highscores));

    JSON.parse(window.localStorage.getItem('highscores')) || [];

    // highscores.sort(function (a, b) {
    //     return b.score - a.score
    // });

    for (var i = 0; i < highscores.length -1; i += 1) {
        var liTag = document.createElement('li');
        liTag.textContent = highscores[i] + ' - ' + highscores[i+1];

        var olEl = document.getElementById('highscores');
        olEl.appendChild(liTag);
    }
    console.log(highscores);
}

printHighscores();

clearEl.addEventListener('click', function() {
    window.localStorage.clear();
    window.location.reload();
});

restartEl.addEventListener('click', function() {
    window.location.reload();
});