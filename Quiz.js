const quizSelector = document.getElementById("quiz-selector");
const quizContainer = document.getElementById("question-container");
const questions = document.getElementById("questions");
const resultContainer = document.getElementById("result-container");
const submitBtn = document.getElementById("submit-button");
const answerBtnContainer = document.getElementById("answers-buttons-container");

let score = 0;
let currentQuiz = null;
let currentQuestionIndex = -1;

const loadAllQuiz = async () => {
  const response = await fetch('./quizzes.json');
  const quizzes = await response.json();

  quizzes.forEach((quiz, index) => {
    const quizCard = document.createElement("div");
    quizCard.classList = 'quiz-card';
    quizCard.innerText = `Quiz ${index + 1}`;
    quizSelector.appendChild(quizCard);

    quizCard.addEventListener('click', () => loadQuiz(quiz));
  });
}

const loadQuiz = (quiz) => {
  currentQuiz = quiz
  currentQuestionIndex = -1;
  quizContainer.style.display = "block";
  quizSelector.style.display = 'none';
  displayQuestions(currentQuiz);
}

const displayQuestions = (quiz) => {
  const randomQuizIndex = Math.floor(Math.random() * quiz.length);
  const randomQuiz = quiz[randomQuizIndex];

  questions.innerHTML = randomQuiz.question;
  questions.classList = "question-heading";

  answerBtnContainer.innerHTML = '';

  randomQuiz.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.classList.add("btn");
    button.setAttribute("id", `button-${index + 1}`)
    answerBtnContainer.appendChild(button);
    button.addEventListener('click', (e) => checkAnswer(e, randomQuiz))

  });
  submitBtn.style.display = "block"; // Show submit button
}

const displayNextQuestion = () => {
  currentQuestionIndex++

  if (currentQuestionIndex < currentQuiz.length) {
    displayQuestions()
  } else 
   {
    displayResult()
   }
}

const checkAnswer = (e, question) => {
  const selectedAnswer = e.target.textContent

  if (selectedAnswer === question.correctAnswer) {
    score += 1;
    console.log(score);
    console.log("Correct Answer!");
  } else {
    console.log("Incorrect Answer!");
  }

  displayNextQuestion()
}

const displayResult = () =>{
  console.log("my Score" + score);
}

loadAllQuiz();
