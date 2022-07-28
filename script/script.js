var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
var questionContainerEl = document.getElementById('question-container')
var questionElement = document.getElementById('question')
var answerButtonsEl = document.getElementById('answer-btn')
let  shuffledQuestions, currentQuestionIndex




startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    console.log('Started')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random()- .5)
    currentQuestionIndex = 0
    questionContainerEl.classList.remove('hide')
    setNextQuestion()
}



function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsEl.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild)
    }
}


function selectAnswer(e) {
    var selectedButton = e.target
    var correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide') 
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
    
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(elemnt) {
    elemnt.classList.remove('correct')
    elemnt.classList.remove('wrong')
}

var questions = [
    {
        question: 'What is 2 + 2',
        answers: [
            {text: '4', correct: true},
            {text: '22', correct: false},
            {text: '8', correct: false},
            {text: '2', correct: false},
        ]
    },
    {
        question: 'What is 2 + 8',
        answers: [
            {text: '4', correct: false},
            {text: '10', correct: true},
            {text: '2', correct: false},
            {text: '8', correct: false},
        ]
    },
    {
        question: 'What is 4 + 2',
        answers: [
            {text: '4', correct: false},
            {text: '7', correct: false},
            {text: '6', correct: true},
            {text: '9', correct: false},
        ]
    },
    {
        question: 'What is 10 + 2',
        answers: [
            {text: '4', correct: false},
            {text: '2', correct: false},
            {text: '22', correct: false},
            {text: '12', correct: true},
        ]
    },
    {
        question: 'What is 20 + 2',
        answers: [
            {text: '4', correct: false},
            {text: '2', correct: false},
            {text: '22', correct: true},
            {text: '222', correct: false},
        ]
    },
]