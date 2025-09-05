const questions = [
    {
    "question": "Who won the ICC Cricket World Cup 2023?",
    "answers": [
      { "text": "India", "correct": false },
      { "text": "Austrlia", "correct": true },
      { "text": "England", "correct": false },
      { "text": "NewZeland", "correct": false }
    ]
  },
  {
    "question": "Where was the final match of the CWC 2023 played?",
    "answers": [
      { "text": "Eden Gardens", "correct": false },
      { "text": "Wankhede Stadium", "correct": false },
      { "text": "M.A. Chidambaram Stadium", "correct": false },
      { "text": "Narendra Modi Stadium", "correct": true }
    ]
  },
  {
    "question": "Who was the Player of the Tournament in CWC 2023?",
    "answers": [
      { "text": "Pat Cummins", "correct": false },
      { "text": "Rohit Sharma", "correct": false },
      { "text": "Virat Kohli", "correct": true },
      { "text": "Travis Head", "correct": false }
    ]
  },
  {
    "question": "Who scored the most runs in CWC 2023?",
    "answers": [
      { "text": "Rachin Ravindra", "correct": false },
      { "text": "Quinton de Kock", "correct": false },
      { "text": "Rohit Sharma", "correct": false },
      { "text": "Virat Kohli", "correct": true }
    ]
  },
  {
    "question": "Who was the Man of the Match in the final?",
    "answers": [
      { "text": "Virat Kohli", "correct": false },
      { "text": "Pat Cummins", "correct": false },
      { "text": "Travis Head", "correct": true },
      { "text": "Steve Smith", "correct": false }
    ]
  },
  {
    "question": "Who took the most wickets in CWC 2023?",
    "answers": [
      { "text": "Adam Zampa", "correct": false },
      { "text": "Mohammed Shami", "correct": true },
      { "text": "Mitchell Starc", "correct": false },
      { "text": "Gerald Coetzee", "correct": false }
    ]
  },
  {
    "question": "Which team did India defeat to reach the final?",
    "answers": [
      { "text": "Australia", "correct": false },
      { "text": "England", "correct": false },
      { "text": "NewZeland", "correct": true },
      { "text": "South Africa", "correct": false }
    ]
  },
  {
    "question": "How many teams participated in CWC 2023?",
    "answers": [
      { "text": "8", "correct": false },
      { "text": "10", "correct": true },
      { "text": "12", "correct": false },
      { "text": "16", "correct": false }
    ]
  },
  {
    "question": "Who was the captain of Australia in the CWC 2023 final?",
    "answers": [
      { "text": "Aaron Finch", "correct": false },
      { "text": "Steve Smith", "correct": false },
      { "text": "Pat Cummins", "correct": true },
      { "text": "David Warner", "correct": false }
    ]
  },
  {
    "question": "Who was the top run-getter for India in the tournament?",
    "answers": [
      { "text": "Rohit Sharma", "correct": false },
      { "text": "Shubman Gill", "correct": false },
      { "text": "KL Rahul", "correct": false },
      { "text": "Virat Kohli", "correct": true }
    ]
  }
];

const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz() {
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". "+currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display="None";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=> {
        if(button.dataset.correct==="true") {
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}

function showScore() {
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex<questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();