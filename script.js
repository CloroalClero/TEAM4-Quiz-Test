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

let score = 0
let currentQuestionId = 0
let timer = null
const duration = 5
let remaining = duration

window.addEventListener("load", () => {
  const checkbox = document.getElementById("check")
  const proceedButton = document.getElementsByClassName("btn-proceed")[0]

  proceedButton.addEventListener("click", () => {
    if (checkbox.checked) {
      startQuiz()
    }
  })
})

// function mostraDomanda() {
//   if (numeroDomanda >= questions.length) {
//     console.log(punteggio)
//     return
//   }

//   const domandaCorrente = questions[numeroDomanda]

//   if (contenitoreDomanda) {
//     contenitoreDomanda.innerHTML = `<span>${domandaCorrente.question}</span>`
//   }

//   const tutteLeRisposte = []

//   tutteLeRisposte.push(domandaCorrente.correct_answer)

//   domandaCorrente.incorrect_answers.forEach((risposta) => {
//     tutteLeRisposte.push(risposta)
//   })

//   contenitoreRisposte.innerHTML = ""

//   tutteLeRisposte.forEach((risposta) => {
//     const containerRisposta = document.createElement("div")
//     containerRisposta.classList.add("answer")

//     const answerRadio = document.createElement("input")
//     answerRadio.type = "radio"
//     answerRadio.name = "answer"
//     answerRadio.value = risposta

//     const answerBox = document.createElement("span")
//     answerBox.classList.add("answerBox")

//     const answerText = document.createElement("span")
//     answerText.classList.add("text")
//     answerText.textContent = risposta

//     answerBox.appendChild(answerText)

//     containerRisposta.appendChild(answerRadio)
//     containerRisposta.appendChild(answerBox)

//     answerRadio.addEventListener("click", () => {
//       if (risposta === domandaCorrente.correct_answer) {
//         punteggio++
//       }

//       numeroDomanda = numeroDomanda + 1
//       mostraDomanda()
//     })

//     contenitoreRisposte.appendChild(containerRisposta)
//   })
// }

function startQuiz() {
  document.body.classList.add("quiz-active")
  score = 0
  currentQuestionId = 0
  showQuestion()
}

function showQuestion() {
  const questionContainer = document.getElementById("questions")
  const answersContainer = document.getElementById("answers")
  const currentQuestion = questions[currentQuestionId]
  const allAnswers = []

  clearInterval(timer)
  remaining = duration

  questionContainer.innerHTML = `<span>${currentQuestion.question}</span>`

  answersContainer.innerHTML = ""

  allAnswers.push(currentQuestion.correct_answer)

  for (let answer of currentQuestion.incorrect_answers) {
    allAnswers.push(answer)
  }

  while (allAnswers.length > 0) {
    printAnwer(
      allAnswers.splice(Math.floor(Math.random() * allAnswers.length), 1),
      answersContainer,
    )
  }

  startTimer()
}

function startTimer() {
  const timerContainer = document.getElementsByClassName("timer-circle")[0]

  timerContainer.innerHTML = ""

  const displayTimer = new ProgressBar.Circle(timerContainer, {
    strokeWidth: 12,
    trailWidth: 12,
    color: "#07bcc8",
    trailColor: "rgba(255,255,255,0.3)",
    duration: 1000,
    easing: "linear",
    svgStyle: {
      transform: "scale(-1, 1)",
      transformOrigin: "50% 50%",
    },
    text: {
      autoStyleContainer: false,
    },
    from: { color: "#07bcc8" },
    to: { color: "#07bcc8" },
    step: function (state, circle) {
      circle.setText(`${remaining}`)
    },
  })

  displayTimer.set(1)

  timer = setInterval(() => {
    remaining--
    displayTimer.animate(remaining / duration)

    if (remaining < 0) {
      clearInterval(timer)
      loadNextQuestion()
    }
  }, 1000)
}

function printAnwer(answer, container) {
  const answerContainer = document.createElement("div")
  answerContainer.classList.add("answer")

  const answerRadio = document.createElement("input")
  answerRadio.type = "radio"
  answerRadio.name = "answer"
  answerRadio.value = answer

  const answerBox = document.createElement("span")
  answerBox.classList.add("answerBox")

  const answerText = document.createElement("span")
  answerText.classList.add("text")
  answerText.textContent = answer

  answerBox.appendChild(answerText)
  answerContainer.appendChild(answerRadio)
  answerContainer.appendChild(answerBox)
  container.appendChild(answerContainer)

  answerRadio.addEventListener("click", () => {
    checkUserSelection(answer)
  })
}

function checkUserSelection(userAnswer) {
  clearInterval(timer)
  const currentQuestion = questions[currentQuestionId]
  if (userAnswer === currentQuestion.correct_answer) {
    score++
  }
  loadNextQuestion()
}

function loadNextQuestion() {
  currentQuestionId++

  if (currentQuestionId >= questions.length) {
    showResult()
  } else {
    showQuestion()
  }
}

function showResult() {
  console.log(score)
}
