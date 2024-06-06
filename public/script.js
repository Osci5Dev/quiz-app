let timerInterval;
let timeLeft = 120;
const totalTime = 120;
let questions = [];
let currentQuestionIndex = 0;

function startTimer() {
    clearInterval(timerInterval);
    timeLeft = totalTime;
    updateProgressBar();
    timerInterval = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        document.getElementById('timer').textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        updateProgressBar();
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Time's up!");
            nextQuestion();
        }
    }, 1000);
}

function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const percentage = (timeLeft / totalTime) * 100;
    progressBar.style.width = `${percentage}%`;
}

function fetchQuestions() {
    fetch('/questions')
        .then(response => response.json())
        .then(data => {
            questions = data;
            currentQuestionIndex = 0;
            displayQuestion();
            startTimer();
        })
        .catch(error => {
            console.error('Error fetching questions:', error);
        });
}

function displayQuestion() {
    if (currentQuestionIndex >= questions.length) {
        alert("Quiz finished!");
        return;
    }
    const questionData = questions[currentQuestionIndex];
    document.getElementById('question').textContent = questionData.question;
    const answersDiv = document.getElementById('answers');
    answersDiv.innerHTML = '';
    questionData.answers.forEach((answer, index) => {
        const div = document.createElement('div');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'answer';
        input.value = index;
        input.id = `answer${index}`;
        const label = document.createElement('label');
        label.htmlFor = `answer${index}`;
        label.textContent = answer;
        div.appendChild(input);
        div.appendChild(label);
        answersDiv.appendChild(div);
    });
}

function submitAnswer() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (!selectedAnswer) {
        alert("Musisz wybrać odpowiedź przed przesłaniem!");
        return;
    }
    const questionData = questions[currentQuestionIndex];
    if (parseInt(selectedAnswer.value) === questionData.correct) {
        nextQuestion();
    } else {
        alert("Niepoprawna odpowiedź!");
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
        startTimer();
    } else {
        alert("Koniec gry! Wszystkie pytania zostały rozwiązane.");
    }
}

function displayQuestion() {
    if (currentQuestionIndex >= questions.length) {
        alert("Quiz finished!");
        return;
    }
    const questionData = questions[currentQuestionIndex];
    document.getElementById('question').textContent = questionData.question;
    const answersDiv = document.getElementById('answers');
    answersDiv.innerHTML = '';
    questionData.answers.forEach((answer, index) => {
        const div = document.createElement('div');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'answer';
        input.value = index;
        input.id = `answer${index}`;
        const label = document.createElement('label');
        label.htmlFor = `answer${index}`;
        label.textContent = String.fromCharCode(65 + index) + ') ' + answer;
        div.appendChild(input);
        div.appendChild(label);
        answersDiv.appendChild(div);
    });
}
