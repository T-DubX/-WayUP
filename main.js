// all answer options
const option1 = document.querySelector('.option1'),
      option2  = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');

// all our options

const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question') // вопрос

const numberOfQuestion = document.getElementById('number-of-question'), // номер вопроса
      numberOfAllQuestions = document.getElementById('number-of-all-questions'); // кол-во всех вопросов

let indexOfQuestion,// индекс текущего вопроса
    indexOfPage = 0;// индекс страницы

const answersTracker = document.getElementById('answers-tracker');// обработка для трекера

const btnNext = document.getElementById('btn-next') // кнопка далее

let score = 0; // итог викторины

const correctAnswer = document.getElementById('correct-answer'),// кол-во правильных ответов
      numberOfQuestions2 = document.getElementById('number-of-all-questions-2'),// кол-во всех вопросов в модальном окне
     btnTryAgain = document.getElementById('btn-try-again');// начать викторину заново

const questions = [
    {
        question: 'Как в JavaScript вычислить процент от числа ?',
        options: [
            'Так в JavaScript нельзя сделать',
            'Оператор : %',
            'Умножить на кол-во процентов и разделить',
            'Вызвать метод findPrecet()',
        ],
        rightAnswer: 2
    },
    {
        question: 'Результат выражения "13" + 7',
        options: [
            '20',
            '137',
            'undefined',
            'error',
        ],
        rightAnswer: 1
    },
    {
        question: 'На JavaScript нельзя писать:',
        options: [
            'Игры',
            'Скрипты для сайтов',
            'Десктопные приложения',
            'Плохо',
        ],
        rightAnswer: 3
    },
];

numberOfAllQuestions.innerHTML = questions.length; // выводим кол-во вопросов

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question; // сам вопрос

    // мапим ответы

    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    // номер текущей страницы
    numberOfQuestion.innerHTML = indexOfPage + 1;
    indexOfPage++;// увеличение индекса страницы
};

let comletedAnswers = [];// массив для уже заданных вопросов

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDublicate = false;// якорь для проверки одинаковых вопросов

    if (indexOfPage == questions.length) {
        quizOver();
    } else {
        if (comletedAnswers.length > 0) {
            comletedAnswers.forEach(elem => {
                if (elem == randomNumber) {
                    hitDublicate = true;
                }
            });
            if (hitDublicate) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if (comletedAnswers.length == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }
    comletedAnswers.push(indexOfQuestion);
};

const checkAnswer = elem => {
    if (elem.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        elem.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    } else {
        elem.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions();
}

for (option of optionElements) {
    option.addEventListener('click', event => checkAnswer(event));
}

const disabledOptions = () => {
    optionElements.forEach(elem => {
        elem.classList.add('disabled');
        if (elem.dataset.id == questions[indexOfQuestion].rightAnswer) {
            elem.classList.add('correct');
        } 
    })
}

// удалени всех классов со  всех ответов
const enableOptions = () => {
    optionElements.forEach(elem => {
        elem.classList.remove('disabled', 'correct', 'wrong');
    })
}

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
}

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`)
}

const validate = () => {
    if (!optionElements[0].classList.contains('disabled')) {
        alert('Вам нужно выбрать один из вариантов ответа')
    } else {
        randomQuestion();
        enableOptions();
    }
}

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active')
    correctAnswer.innerHTML = score;
    numberOfQuestions2.innerHTML = questions.length;
};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () => {
    validate();
})

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
})