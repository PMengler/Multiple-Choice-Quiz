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
const submitEl = document.getElementById("submitScore");

var timeLeft = 60;

// create our questions
let questions = [
    {
        question: "What does HTML stand for?",
        choiceA: "HyperText Markup Language",
        choiceB: "HugeText Markup Language",
        choiceC: "HyperText Made Language",
        choiceD: "HyperText Mark Long",
        correct: "A"
    },{
        question: "What does CSS stand for?",
        choiceA: "Corresponding Style Sheets",
        choiceB: "Cascading Style Sheets",
        choiceC: "Cool Style Sheets",
        choiceD: "Cascading Sheet Styles",
        correct: "B"
    },{
        question: "What does JS stand for?",
        choiceA: "JokerStyle",
        choiceB: "JumbleScript",
        choiceC: "JavaScript",
        choiceD: "JavaSheet",
        correct: "C"
    },{
        question: "What is the correct syntax for invoking a function?",
        choiceA: "function{}",
        choiceB: "function[]",
        choiceC: "function||",
        choiceD: "function()",
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
            clearInterval(timerEl);
            // displayScore();
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
     } 
     else {
        clearInterval(timeLeft);
     }
     console.log(score);
     localStorage.setItem('score', score);
};

submitEl.addEventListener("click", function() {
    var name = prompt("You answered " + localStorage.getItem("score", score) + " out of 4 correctly. Enter your name to save your score.");
    localStorage.setItem("name", name);
});

// answer is Correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "green";
};

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "red";
    timeLeft -= 10;
};

// Timer that counts down from 60 seconds to 0
function countdown() {
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
        clearInterval(timeLeft);   
    };
}, 1000)
};