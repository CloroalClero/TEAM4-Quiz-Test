const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
]
/**
 * Variabili globali per il funzionamento del codice
 */

let score = 0
let currentQuestionId = 0
let timer = null
const timerDuration = 60
let timerRemaining = timerDuration
let alreadySelected = false

/**
 * Controllo Welcome section per iniziare il quiz
 */

window.addEventListener("load", () => {
  const checkbox = document.getElementById("check")
  const proceedButton = document.getElementsByClassName("btn-proceed")[0]

  checkbox.addEventListener("change", () => {
    proceedButton.disabled = !checkbox.checked
  })

  proceedButton.addEventListener("click", () => {
    if (checkbox.checked) {
      startQuiz()
    }
  })
})

/**
 * Inizio del quiz
 * Inizializzazione di score e domanda attuale
 * Mostra sezione Quiz e nasconte Welcome
 */

function startQuiz() {
  document.body.classList.add("quiz-active")
  score = 0
  currentQuestionId = 0
  document.getElementById("totalQuestions").textContent = questions.length
  showQuestion()
}

/**
 * Mostra domanda
 */

function showQuestion() {
  const questionContainer = document.getElementById("questions")
  const answersContainer = document.getElementById("answers")
  const currentQuestion = questions[currentQuestionId]
  const allAnswers = []

  // Stampa indice domanda corrente
  document.getElementById("currentQuestion").textContent = currentQuestionId + 1

  // Inizializzazione del timer
  clearInterval(timer)
  timerRemaining = timerDuration

  // Inizializza domanda già selezionata (per evitare doppia risposta)
  alreadySelected = false

  // Stampa domanda attuale
  questionContainer.innerHTML = `${currentQuestion.question}`

  // Pulizia container risposte
  answersContainer.innerHTML = ""

  // Creazione array delle risposte
  allAnswers.push(currentQuestion.correct_answer)

  for (let answer of currentQuestion.incorrect_answers) {
    allAnswers.push(answer)
  }

  // Stampa casuale delle risposte

  while (allAnswers.length > 0) {
    printAnwer(
      allAnswers.splice(Math.floor(Math.random() * allAnswers.length), 1)[0],
      answersContainer,
    )
  }

  // Inizio timer
  startTimer()
}

/**
 * inizio del timer
 */

function startTimer() {
  const timerContainer = document.getElementsByClassName("timer-circle")[0]

  // Puliziare container timer
  timerContainer.innerHTML = ""

  // Creazione del timer
  const displayTimer = new ProgressBar.Circle(timerContainer, {
    strokeWidth: 10,
    trailWidth: 10,
    color: "#07bcc8",
    trailColor: "rgba(255,255,255,0.1)",
    duration: 1000,
    easing: "linear",
    svgStyle: {
      transform: "scale(-1, 1)",
      transformOrigin: "50% 50%",
      filter: "drop-shadow(0 0 10px rgba(0,0,0,0.5)",
    },
    text: {
      autoStyleContainer: false,
    },
    from: { color: "#07bcc8" },
    to: { color: "#07bcc8" },
    step: function (state, circle) {
      // Stampa secondi
      circle.setText(`
        <span class="timer-text">SECONDS</span>
        <span class="timer-seconds">${timerRemaining}</span>
        <span class="timer-text">REMAINING</span>
        `)
    },
  })

  // // Stato iniziale del timer, inizia dal 100% (1)
  displayTimer.set(1)

  // Logica per decrementare i secondi
  timer = setInterval(() => {
    timerRemaining--
    displayTimer.animate((timerRemaining - 1) / timerDuration)

    if (timerRemaining === 0) {
      // Stop timer
      clearInterval(timer)
      loadNextQuestion()
    }
  }, 1000)
}

/**
 * Stampa delle risposte
 */

function printAnwer(answer, container) {
  // Nodo container
  const answerContainer = document.createElement("div")
  answerContainer.classList.add("answer")

  // Nodo input risposta
  const answerRadio = document.createElement("input")
  answerRadio.type = "radio"
  answerRadio.name = "answer"
  answerRadio.value = answer

  // Nodo input container
  const answerBox = document.createElement("span")
  answerBox.classList.add("answerBox")

  // Nodo label input
  const answerText = document.createElement("span")
  answerText.classList.add("text")
  answerText.textContent = answer

  // Aggregazione degli elementi
  answerBox.appendChild(answerText)
  answerContainer.appendChild(answerRadio)
  answerContainer.appendChild(answerBox)
  container.appendChild(answerContainer)

  // Aggiunta evento al click delle risposte
  answerRadio.addEventListener("click", () => {
    checkUserSelection(answer)
  })
}

/**
 * Controllo della risposta seleziona dall'utente
 */

function checkUserSelection(userAnswer) {
  // Stop timer
  clearInterval(timer)

  // Controllo risposta
  const currentQuestion = questions[currentQuestionId]

  if (userAnswer === currentQuestion.correct_answer && !alreadySelected) {
    score++
  }

  // Carica domanda successiva
  if (!alreadySelected) {
    setTimeout(() => {
      loadNextQuestion()
    }, 500)
  }

  alreadySelected = true
}

/**
 * Caricamento domanda successiva
 */

function loadNextQuestion() {
  //Incremento indice domanda attuale
  currentQuestionId++

  // Controllo se ultima domanda
  if (currentQuestionId >= questions.length) {
    // Mostra risultato
    showResult()
  } else {
    // Stampa domanda
    showQuestion()
  }
}

/**
 * Caricamento pagina Result
 */

function showResult() {
  // Mostra Result
  document.body.classList.remove("quiz-active")
  document.body.classList.add("result-active")

  let scorePercentage = (score / questions.length) * 100
  let color =
    scorePercentage < 30
      ? "#d41f07"
      : scorePercentage < 60
        ? "#c5c807"
        : "#6ec807"

  // Creazione score-bar
  const resultContainer = document.getElementById("resultContainer")
  const resultBar = new ProgressBar.SemiCircle(resultContainer, {
    strokeWidth: 6,
    color: "#07bcc8",
    trailColor: "#eee",
    trailWidth: 6,
    easing: "easeOut",
    duration: 1500,
    text: {
      value: "0%",
      alignToBottom: false,
    },
    from: { color: "#d41f07" },
    to: { color: color },
    step: (state, resultBar) => {
      resultBar.path.setAttribute("stroke", state.color)
      var value = Math.round(resultBar.value() * 100)
      resultBar.setText(`${value}%`)
      resultBar.text.style.color = state.color
    },
  })

  // Avvia animazione fino a punteggio
  resultBar.animate(scorePercentage / 100)

  // Animazione coriandoli
  confetti({
    position: { x: window.innerWidth * 0.5, y: 0 },
    count: scorePercentage < 30 ? 0 : scorePercentage < 60 ? 500 : 1000,
    size: 1,
    velocity: scorePercentage < 30 ? 0 : scorePercentage < 60 ? 500 : 1000,
    fade: true,
  })
}
