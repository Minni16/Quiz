const questions = {
  // easy, medium, hard are arrays
  easy: [
    { 
      // question, options, answer are objects
      question: "What color is the sky on a clear day?",
      options: ["Blue", "Green", "Red", "Yellow"],
      answer: "Blue",
    },
    {
      question: "How many days are in a week?",
      options: ["5", "6", "7", "8"],
      answer: "7",
    },
    {
      question: "Which animal barks?",
      options: ["Cat", "Dog", "Cow", "Sheep"],
      answer: "Dog",
    },
    {
      question: "Which number is even?",
      options: ["3", "5", "7", "8"],
      answer: "8",
    },
    {
      question: "Which fruit is yellow when ripe?",
      options: ["Apple", "Banana", "Grapes", "Strawberry"],
      answer: "Banana",
    },
    {
      question: "Which month has 28 days?",
      options: ["February only", "All months", "January only", "June only"],
      answer: "All months",
    },
  ],
  medium: [
    {
      question: "What does HTTP stand for?",
      options: [
        "HyperText Transfer Protocol",
        "High Transfer Text Process",
        "Hyper Terminal Transport Protocol",
        "Host Transfer Text Protocol",
      ],
      answer: "HyperText Transfer Protocol",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Jupiter", "Mars", "Mercury"],
      answer: "Mars",
    },
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      answer: "Paris",
    },
    {
      question: "Which language runs in a web browser?",
      options: ["Java", "C++", "Python", "JavaScript"],
      answer: "JavaScript",
    },
    {
      question: "Which data structure uses FIFO (First-In, First-Out)?",
      options: ["Stack", "Queue", "Tree", "Graph"],
      answer: "Queue",
    },
    {
      question: "Which HTML tag represents the largest heading?",
      options: ["<h6>", "<h1>", "<header>", "<title>"],
      answer: "<h1>",
    },
  ],
  hard: [
    {
      question: "What is the time complexity of binary search (average case)?",
      options: ["O(n)", "O(n log n)", "O(log n)", "O(1)"],
      answer: "O(log n)",
    },
    {
      question: "Who developed the theory of general relativity?",
      options: [
        "Isaac Newton",
        "Albert Einstein",
        "Niels Bohr",
        "Galileo Galilei",
      ],
      answer: "Albert Einstein",
    },
    {
      question: "In CSS, which property controls the stacking order of elements?",
      options: ["position", "display", "z-index", "overflow"],
      answer: "z-index",
    },
    {
      question: "In JavaScript, what is the result of typeof null?",
      options: ["null", "undefined", "object", "boolean"],
      answer: "object",
    },
    {
      question: "Which SQL clause filters grouped records?",
      options: ["WHERE", "GROUP BY", "HAVING", "ORDER BY"],
      answer: "HAVING",
    },
    {
      question:
        "Which algorithm finds shortest paths in weighted graphs without negative weights?",
      options: [
        "Kruskal's algorithm",
        "Dijkstra's algorithm",
        "Prim's algorithm",
        "Bellman-Ford",
      ],
      answer: "Dijkstra's algorithm",
    },
  ],
};

// three screens
const screenStart = document.getElementById("screen-start");
const screenQuiz = document.getElementById("screen-quiz");
const screenResults = document.getElementById("screen-results");

// sabai lai variables ma store gareko
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const nextBtn = document.getElementById("next-btn");

const progressEl = document.getElementById("progress");
const scoreEl = document.getElementById("score");
const questionText = document.getElementById("question-text");
const optionsForm = document.getElementById("options");
const finalScoreEl = document.getElementById("final-score");
const summaryEl = document.getElementById("summary");

// state variables - game ko status track garna ko lagi
let currentDifficulty = "easy"; 
let currentIndex = 0; // kun question ma xa aile
let currentScore = 0;
let submittedForCurrent = false; // current question ko answer submit vayo ki vayena vanera store garxa
let currentQuestions = [];
let userAnswers = []; 

// helper function ie = qs("#id") - same as document.querySelector("#id"); hence, a shortcut function
function qs(selector, root = document) {
  return root.querySelector(selector);
}

// array ma convert gareko so that methods can be used freely, class ko elements haru return garxa in the way of array
function qsa(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

// hidden class delete garxa
function show(el) {
  el.classList.remove("hidden");
}

// hidden class add garxa
function hide(el) {
  el.classList.add("hidden");
}

// sabai reset gardinxa so that new game start garda feri pailako na aawos
function resetState() {
  currentIndex = 0;
  currentScore = 0;
  submittedForCurrent = false;
  userAnswers = [];
  currentQuestions = []; 
  updateScoreBar();
}

// kun difficulty radio button check gareko raixa
function getSelectedDifficulty() {
  const chosen = qs('input[name="difficulty"]:checked');
  return chosen ? chosen.value : "easy";
}

// kun question ma xa aile update garxa
function updateProgressBar() {
  const total = currentQuestions.length;
  progressEl.textContent = `Question ${currentIndex + 1} of ${total}`;
}

// kati score vayo aile samma vanera update garxa
function updateScoreBar() {
  scoreEl.textContent = `Score: ${currentScore}`;
}

// current question lai screen ma display garne
function renderQuestion() {
  const q = currentQuestions[currentIndex];

  submittedForCurrent = false;
  optionsForm.innerHTML = "";
  nextBtn.disabled = true;

  questionText.textContent = q.question;

  const options = q.options;
  options.forEach((opt, idx) => {
    const id = `opt-${currentIndex}-${idx}`;
    const label = document.createElement("label");
    label.className = "option";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "answer";
    input.value = opt;
    input.id = id;
    input.addEventListener("change", () => {
      nextBtn.disabled = false;
    });

    const faux = document.createElement("span");
    faux.className = "option__faux";

    const text = document.createElement("span");
    text.className = "option__text";
    text.textContent = opt;

    label.appendChild(input);
    label.appendChild(faux);
    label.appendChild(text);
    optionsForm.appendChild(label);
  });

  updateProgressBar();
  updateActionButtonLabel();
}

// options highlight garne (green/red) after user submits answer
function markOptions(correctAnswer, userAnswer) {
  qsa('input[name="answer"]').forEach((input) => {
    const parent = input.closest(".option");
    parent.classList.remove("is-correct", "is-incorrect");
    if (input.value === correctAnswer) {
      parent.classList.add("is-correct");
    }
    if (userAnswer && input.checked && input.value !== correctAnswer) {
      parent.classList.add("is-incorrect");
    }
    input.disabled = true;
  });
}

function startQuiz() {
  currentDifficulty = getSelectedDifficulty();
  resetState();
  currentQuestions = questions[currentDifficulty];

  hide(screenStart);
  hide(screenResults);
  show(screenQuiz);

  renderQuestion();
}

function submitAnswer() {
  if (submittedForCurrent) return; 
  const q = currentQuestions[currentIndex];
  const selected = qs('input[name="answer"]:checked');
  if (!selected) return; 

  const userAnswer = selected.value;
  const correctAnswer = q.answer;
  const isCorrect = userAnswer === correctAnswer;

  if (isCorrect) {
    currentScore += 1;
  }
  updateScoreBar();
  markOptions(correctAnswer, userAnswer);

  userAnswers.push({
    question: q.question,
    correctAnswer,
    userAnswer,
    isCorrect,
  });

  submittedForCurrent = true;
  nextBtn.disabled = false;
  updateActionButtonLabel();
}

function nextQuestion() {
  if (!submittedForCurrent) return; 

  const lastIndex = currentQuestions.length - 1;
  if (currentIndex >= lastIndex) {
    showResults();
    return;
  }

  currentIndex += 1;
  renderQuestion();
}

function showResults() {

  hide(screenQuiz);
  show(screenResults);

  const total = currentQuestions.length;
  finalScoreEl.textContent = `You scored ${currentScore} out of ${total}.`;

  summaryEl.innerHTML = "";

  userAnswers.forEach((entry, i) => {
    const item = document.createElement("div");
    item.className = "summary__item";

    // shows the question number and text
    const qEl = document.createElement("div");
    qEl.className = "summary__question";
    qEl.textContent = `Q${i + 1}. ${entry.question}`;

    // styling the user answer
    const ua = document.createElement("div");
    ua.className = `summary__answer ${entry.isCorrect ? "ok" : "bad"}`;
    ua.textContent = `Your answer: ${entry.userAnswer}`;

    // shows right answer
    const ca = document.createElement("div");
    ca.className = "summary__correct";
    ca.textContent = `Correct answer: ${entry.correctAnswer}`;

    item.appendChild(qEl);
    item.appendChild(ua);
    item.appendChild(ca);
    summaryEl.appendChild(item);
  });
}

function restartQuiz() {
  resetState();
  hide(screenQuiz);
  hide(screenResults);
  show(screenStart);
}

// makes sure the script only runs after all HTML is loaded
document.addEventListener("DOMContentLoaded", () => {
  startBtn.addEventListener("click", startQuiz);
  nextBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!submittedForCurrent) {
      submitAnswer();
    } else {
      const lastIndex = currentQuestions.length - 1;
      if (currentIndex >= lastIndex) {
        showResults();
      } else {
        nextQuestion();
      }
    }
  });
  restartBtn.addEventListener("click", restartQuiz);

});

function updateActionButtonLabel() {
  const lastIndex = currentQuestions.length - 1;
  if (submittedForCurrent && currentIndex >= lastIndex) {
    nextBtn.textContent = "Finish";
  } else {
    nextBtn.textContent = "Next";
  }
}