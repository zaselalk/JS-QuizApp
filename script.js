const quizes = [
  {
    question: "In which Italian city can you find the Colosseum?",
    correct_index: 0,
    answers: ["Venice", "Rome", "Naples", "Milan"],
  },
  {
    question: "What is the largest canyon in the world?",
    correct_index: 2,
    answers: ["Venice", "Rome", "Naples", "Milan"],
  },
  {
    question: "In the TV show New Girl, which actress plays Jessica Day?",
    correct_index: 3,
    answers: ["Venice", "Rome", "Naples", "Milan"],
  },
];

let curr_quiz = 0;
let correct_ans = 0;
let clearFunctions = [];

const quizTitle = document.getElementById("quiz-title");
const nextBtn = document.getElementById("btn-next");
const scorePannel = document.getElementById("score-panel");
const quizPannel = document.getElementById("quiz-panel");
const answerPannel = document.getElementById("anwser-panel");
const answerBtns = document.getElementsByClassName("answer-btn");
const score = document.getElementById("score");
const startBtn = document.getElementById("start");
const startPannel = document.getElementById("start-panel");
const restartBtn = document.getElementById("restart");

//Event Listners
nextBtn.addEventListener("click", nextQuiz);
startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", startQuiz);

// Add Event Listner for all answer buttons
for (let btn of answerBtns) {
  btn.addEventListener("click", submitAnswer);
}

function disableAllButtons() {
  for (let btn of answerBtns) {
    btn.setAttribute("disabled", "true");
  }

  clearFunctions.push(() => {
    for (let btn of answerBtns) {
      btn.removeAttribute("disabled");
    }
  });
}

function startQuiz() {
  quizPannel.classList.remove("hidden");
  startPannel.classList.add("hidden");
  curr_quiz = 0;
  correct_ans = 0;
  nextQuiz();
}

function nextQuiz() {
  clearPrev();
  if (quizes.length <= curr_quiz) {
    showScore();
    curr_quiz = 0;
    return false;
  }
  nextBtn.classList.add("hidden");
  showQuestion();
  curr_quiz++;
}

function showScore() {
  quizPannel.classList.add("hidden");
  scorePannel.classList.remove("hidden");

  score.innerText = `Your score ${correct_ans} / ${quizes.length}`;

  clearFunctions.push(() => {
    quizPannel.classList.remove("hidden");
    scorePannel.classList.add("hidden");
  });
}

function showQuestion() {
  const question = quizes[curr_quiz];
  quizTitle.innerText = question.question;

  for (let i = 0; i < 4; i++) {
    answerBtns[i].innerText = question.answers[i];
    answerBtns[i].dataset.index = i;
  }
}

function clearPrev() {
  for (let func of clearFunctions) {
    func();
  }

  clearFunctions = [];
}

function submitAnswer(event) {
  let answer = parseInt(event.target.dataset.index);
  let correctAnswer = parseInt(quizes[curr_quiz - 1].correct_index);

  disableAllButtons();

  nextBtn.classList.remove("hidden");

  if (answer === correctAnswer) {
    answerBtns[correctAnswer].classList.add("correct");

    correct_ans++;

    clearFunctions.push(() => {
      answerBtns[correctAnswer].classList.remove("correct");
    });
    return;
  }

  answerBtns[correctAnswer].classList.add("correct");
  answerBtns[answer].classList.add("wrong");

  clearFunctions.push(() => {
    answerBtns[correctAnswer].classList.remove("correct");
    answerBtns[answer].classList.remove("wrong");
  });
}
