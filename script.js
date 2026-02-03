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
        incorrect_answers: [
          "Ice Cream Sandwich",
          "Jelly Bean",
          "Marshmallow",
        ],
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
    ];

let punteggio = 0
let numeroDomanda = 0

const contenitoreDomanda = document.getElementById("contenitore-domanda")
const contenitoreRisposte = document.getElementById("contenitore-risposte")

function mostraDomanda() {
  if (numeroDomanda >= questions.length) {
    console.log(punteggio)
    return
  }

    const domandaCorrente = questions[numeroDomanda]

    if (contenitoreDomanda) {
        contenitoreDomanda.textContent = domandaCorrente.question
    }

    const tutteLeRisposte = []

    tutteLeRisposte.push(domandaCorrente.correct_answer)

    domandaCorrente.incorrect_answers.forEach((risposta) => {
    tutteLeRisposte.push(risposta)
  })

  if (contenitoreRisposte) {
    contenitoreRisposte.innerHTML = ""
  }

  tutteLeRisposte.forEach((risposta) => {
    const containerRisposta = document.createElement("div")
    containerRisposta.classList.add("answer")

    const answerRadio = document.createElement("input")
    answerRadio.type = "radio"
    answerRadio.name = "answer"
    answerRadio.value = risposta

    const answerBox = document.createElement("span")
    answerBox.classList.add("answerBox")

    const answerText = document.createElement("span")
    answerText.classList.add("text")
    answerText.textContent = risposta

    answerBox.appendChild(answerText)

    containerRisposta.appendChild(answerRadio)
    containerRisposta.appendChild(answerBox)

    answerRadio.addEventListener("click", () => {
      console.log(this)
      if (this.value === domandaCorrente.correct_answer) {
        punteggio++
      }

      numeroDomanda = numeroDomanda + 1
      mostraDomanda()
    })

    if (contenitoreRisposte) {
        contenitoreRisposte.innerHTML = ""
    }

    tutteLeRisposte.forEach((risposta) => {
    const bottoneRisposta = document.createElement("button")
    bottoneRisposta.type = "button"
    bottoneRisposta.textContent = risposta

    bottoneRisposta.addEventListener("click", () => {
        if (risposta === domandaCorrente.correct_answer) {
        punteggio = punteggio + 1
    }

    numeroDomanda = numeroDomanda + 1
    mostraDomanda()
    })

    if (contenitoreRisposte) {
        contenitoreRisposte.appendChild(bottoneRisposta)
        }
    })
}

mostraDomanda()