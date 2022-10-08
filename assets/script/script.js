const questionFeild = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const playBtn = document.getElementById('playBtn');
let progessText = document.getElementById('progessText');
let progressBarFill = document.getElementById('progressBarFull');
let scoreText = document.getElementById('score');
let timerText = document.getElementById('time');
let currentQuestion = {};
let hide = document.getElementById('sub');

// does not accept answers until questions are loaded
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];
var sec = 30;
let questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript??',
        choice1: '<script>',
        choice2: '<javascript>',
        choice3: '<js>',
        choice4: '<scripting>',
        answer: 1,
    },
    {
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3,
    },
    {
        question: " How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4,
    },
    {
        question: 'What is the use of isNaN function?',
        choice1: 'is a function which changes a string to a number',
        choice2: 'isNan function returns true if the argument is not a number; otherwise, it is false.',
        choice3: 'allows user to style their page from a js document',
        choice4: 'Disables active number of arrays in a function',
        answer: 4,
    }
];

    // CONSTANTS
    // 
const CORRECT_BONUS = 10;
const MAX_QUESTION = 4;
const TIME_BONUS = 10;
startGame = () => {
    // questionCounter is equal to 0 we are using this as a reset 
    questionConunter = 0;
    // player score
    score = 0;
    // copy in all the questons from questions-array and put it into a new array ...
    // ... using the the spread opperator 
    availableQuesions = [...questions];
    // call next function whcih populates
    function startTimer(){
        console.log('timer suppose to go')
        var timer = setInterval(function(){
            sec--;
            timerText.innerText='00:'+sec;
            if(sec == 6){
                timerText.classList.add('red');
            }
            if (sec < 0) {
                clearInterval(timer);
            }   
            if(sec <= 0){
                timerText.innerText='TIMES UP';
                acceptingAnswers;
                setTimeout(() => {
                    return window.location.assign('./pages/highScore.html');
                }, 3000);
            }
        }, 1000);

    }
    startTimer();
    getNewQuestion();
};



getNewQuestion = () => {
    if(availableQuesions.length === 0 || questionCounter >= MAX_QUESTION){
        localStorage.setItem("recentScore", score);
        return window.location.assign('./pages/end.html');
    }
    // the counter for the question goes up 
    // HUD QUESTION COUNTER
    questionCounter++; 
    // Progess Bar TEXT
    progessText.innerText = `Question ${questionCounter}/${MAX_QUESTION}`;
    //  Progess bar fill
    progressBarFill.style.width = `${(questionCounter/MAX_QUESTION) * 100}%`

    // random number gen between 0 to the length of the available quesions array 
    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    // randomly select a question from the availableQuestions array and place it to currentQuestion
    currentQuestion = availableQuesions[questionIndex];
    // populate the questions container with the currentQuestion question
    questionFeild.innerText = currentQuestion.question;

    choices.forEach(    choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex , 1); 
    // console.log(availableQuesions)
    acceptingAnswers = true;
};
// read user input for choices // animation for corrent and incorrect selections
// for eeach of the choices inside the questions object we will take one parameter (choices)
choices.forEach( choice => { 
    // listen for what users clicks
    choice.addEventListener('click' , e => {
        // if userAnsers and page is not populated then return;
        if(!acceptingAnswers) return;

            acceptingAnswers = false;
            // create a const containing the html userInput from the click event
            const selectChoice = e.target;
            console.log(selectChoice)
            // set the dataset Number to userInput 
            const selectAnswers = selectChoice.dataset['number'];
            console.log(selectAnswers)

        let classToApply = 'incorrect';
        if ( selectAnswers == currentQuestion.answer){
            classToApply = 'correct';
        }
        selectChoice.parentElement.classList.add(classToApply);
        
        if(classToApply == 'correct'){
            incrementScore(CORRECT_BONUS);
        }

        if(selectAnswers != currentQuestion.answer){
            sec -= 5;
            hide.classList.remove('hidden');
            hide.classList.add('red');;
        }
        setTimeout(() => {
            selectChoice.parentElement.classList.remove(classToApply);
            hide.classList.add('hidden');
            
            getNewQuestion();
        }, 1000);
    });
    return(sec);
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}



window.onload = startGame();
