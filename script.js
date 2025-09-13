const questions = {
  math: [
    { question: "7 + 3 = ?", answer: "10" },
    { question: "9 x 2 = ?", answer: "18" },
    { question: "5 - 2 = ?", answer: "3" }
  ],
  science: [
    { question: "น้ำเดือดที่กี่องศา?", answer: "100" },
    { question: "พืชสร้างอาหารด้วย?", answer: "แสงแดด" }
  ],
  english: [
    { question: "Hello แปลว่าอะไร?", answer: "สวัสดี" },
    { question: "Cat แปลว่าอะไร?", answer: "แมว" }
  ]
};

let currentSubject = "math";
let currentQuestionIndex = -1;
let quizList = [];
let score = 0;

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

function startQuiz() {
  currentSubject = document.getElementById("subject-select").value;
  quizList = [...questions[currentSubject]]; // clone array
  score = 0; // reset score
  updateScoreDisplay();
  showRandomQuestion();
}

function showRandomQuestion() {
  if (quizList.length === 0) {
    document.getElementById("quiz-container").innerHTML = `
      <p>🎉 ทำครบหมดแล้ว!</p>
      <p>คะแนนรวมของคุณ: <strong>${score}</strong></p>
    `;
    return;
  }

  const randomIndex = Math.floor(Math.random() * quizList.length);
  const q = quizList[randomIndex];
  currentQuestionIndex = randomIndex;

  document.getElementById("quiz-container").innerHTML = `
    <p><strong>คำถาม:</strong> ${q.question}</p>
    <input type="text" id="user-answer" placeholder="คำตอบของคุณ"><br><br>
    <button onclick="checkAnswer()">ตรวจคำตอบ</button>
  `;
}

function checkAnswer() {
  const userAnswer = document.getElementById("user-answer").value.trim();
  const correctAnswer = quizList[currentQuestionIndex].answer;

  if (userAnswer === correctAnswer) {
    alert("✅ ถูกต้อง!");
    score++;
    updateScoreDisplay();
    quizList.splice(currentQuestionIndex, 1); // remove current question
    showRandomQuestion();
  } else {
    alert("❌ ยังไม่ถูก ลองอีกครั้ง");
  }
}

function updateScoreDisplay() {
  let scoreElement = document.getElementById("score-display");
  if (!scoreElement) {
    scoreElement = document.createElement("div");
    scoreElement.id = "score-display";
    scoreElement.style.position = "fixed";
    scoreElement.style.top = "10px";
    scoreElement.style.right = "10px";
    scoreElement.style.background = "#2ecc71";
    scoreElement.style.color = "#fff";
    scoreElement.style.padding = "10px 15px";
    scoreElement.style.borderRadius = "8px";
    scoreElement.style.fontWeight = "bold";
    document.body.appendChild(scoreElement);
  }
  scoreElement.textContent = `คะแนน: ${score}`;
}

// Register service worker (PWA support)
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("✅ Service Worker registered"))
    .catch((err) => console.error("❌ SW registration failed:", err));
}
