// element selectors
const timerEl = document.getElementById("countdown");
const startEl = document.getElementById("start");

const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question: "What does HTML stand for?",
        choiceA: "Correct",
        choiceB: "Wrong",
        choiceC: "Wrong",
        choiceD: "Wrong",
        correct: "A"
    },{
        question: "What does CSS stand for?",
        choiceA: "Wrong",
        choiceB: "Correct",
        choiceC: "Wrong",
        choiceD: "Wrong",
        correct: "B"
    },{
        question: "What does JS stand for?",
        choiceA: "Wrong",
        choiceB: "Wrong",
        choiceC: "Correct",
        choiceD: "Wrong",
        correct: "C"
    },{
        question: "How do you invoke a function?",
        choiceA: "Wrong",
        choiceB: "Wrong",
        choiceC: "Wrong",
        choiceD: "Correct",
        correct: "D"
    }
];

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
let score = 0;

function displayQuestion() {
    let q = questions[runningQuestion];
    question.innerHTML = "<h3>"+ q.question +"</h3>"
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
};

// initiates the timer to start countdown
startEl.addEventListener("click", function(){
    countdown();
    quizStart();
});

// Quiz begins
function quizStart() {
    startEl.style.display = "none";
    displayQuestion();
    quiz.style.display = "block";
    displayProgress();
};

function displayProgress() {
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
};

function displayCounter(){
    if(count <= timeLeft){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    } else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            displayQuestion();
        }else{
            // end the quiz and show the score
            // clearInterval(timeLeft);
            displayScore();
        }
    }
};

function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct){
        score++;
        answerIsCorrect();
    } else {
        answerIsWrong();
    }
    count = 0;
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        displayQuestion();
     } else {
        displayScore();
     }
     console.log(score);
};

// answer is Correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "green";
};

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "red";
};

function displayScore(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
};

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