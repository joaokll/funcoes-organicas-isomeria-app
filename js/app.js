// Banco de dados de perguntas focadas no tema do quadro (Funções Orgânicas e Isomeria)
const quizQuestions = [
    {
        question: "Qual das seguintes alternativas apresenta uma característica exclusiva da função orgânica Álcool?",
        options: [
            "Possui uma hidroxila (-OH) ligada diretamente a um anel aromático.",
            "Possui uma hidroxila (-OH) ligada a um carbono saturado (ligações simples).",
            "Possui uma carbonila entre dois átomos de carbono.",
            "Possui o grupo funcional -COO- entre carbonos."
        ],
        correct: 1
    },
    {
        question: "O propanal (aldeído) e a propanona (cetona) possuem a mesma fórmula molecular (C3H6O). Que tipo de isomeria plana ocorre entre eles?",
        options: [
            "Isomeria de Cadeia",
            "Isomeria de Posição",
            "Isomeria de Função",
            "Tautomeria"
        ],
        correct: 2
    },
    {
        question: "A diferença estrutural entre o Butan-1-ol e o Butan-2-ol classifica-os como isômeros de:",
        options: [
            "Posição, pois a hidroxila muda de lugar na cadeia.",
            "Cadeia, pois um possui cadeia ramificada e o outro linear.",
            "Função, pois pertencem a famílias químicas diferentes.",
            "Compensação (Metameria), pois o heteroátomo mudou de lugar."
        ],
        correct: 0
    },
    {
        question: "Qual função orgânica é responsável pelo aroma característico de muitas frutas e é muito utilizada na indústria de flavorizantes?",
        options: [
            "Éter",
            "Ácido Carboxílico",
            "Amida",
            "Éster"
        ],
        correct: 3
    },
    {
        question: "Para que ocorra isomeria geométrica (Cis-Trans) em uma cadeia alifática, é necessário que:",
        options: [
            "Haja uma ligação tripla entre carbonos.",
            "Os ligantes de cada carbono da dupla ligação sejam diferentes entre si.",
            "A cadeia seja obrigatoriamente saturada e ramificada.",
            "Exista um átomo de oxigênio dividido no meio da cadeia."
        ],
        correct: 1
    }
];

let currentQuestionIndex = 0;
let userScore = 0;

// Elementos da tela
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const progressBar = document.getElementById("progress");
const nextButton = document.getElementById("next-btn");
const scoreText = document.getElementById("score-text");
const restartButton = document.getElementById("restart-btn");

function startQuiz() {
    currentQuestionIndex = 0;
    userScore = 0;
    resultScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    loadQuestion();
}

function loadQuestion() {
    resetState();
    const currentQuestion = quizQuestions[currentQuestionIndex];
    
    // Atualiza texto e barra de progresso
    questionElement.innerText = currentQuestion.question;
    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // Cria os botões de alternativas
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => selectOption(index, button));
        optionsContainer.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add("hidden");
    optionsContainer.innerHTML = "";
}

function selectOption(selectedIndex, selectedButton) {
    const correctIndex = quizQuestions[currentQuestionIndex].correct;
    const allButtons = optionsContainer.querySelectorAll(".option-btn");

    // Desativa todos para evitar cliques múltiplos e destaca as cores
    allButtons.forEach((button, index) => {
        button.disabled = true;
        if (index === correctIndex) {
            button.classList.add("correct"); // Mostra a resposta certa
        }
    });

    if (selectedIndex === correctIndex) {
        userScore++;
    } else {
        selectedButton.classList.add("wrong"); // Mostra que o usuário errou
    }

    nextButton.classList.remove("hidden");
}

function showResults() {
    quizScreen.classList.add("hidden");
    nextButton.classList.add("hidden"); // <-- LINHA ADICIONADA PARA CORRIGIR O BUG
    resultScreen.classList.remove("hidden");
    progressBar.style.width = "100%";
    scoreText.innerText = `Você acertou ${userScore} de ${quizQuestions.length} perguntas no teste de Química!`;
}


nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

restartButton.addEventListener("click", startQuiz);

// Inicializa o app ao carregar a página
startQuiz();
