const questions = {
  math: [
    { question: "7 + 3 = ?", answer: "10" },
    { question: "9 x 2 = ?", answer: "18" }
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

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

function startQuiz() {
  const subject = document.getElementById("subject-select").value;
  const quiz = questions[subject];
  const q = quiz[Math.floor(Math.random() * quiz.length)];
  const container = document.getElementById("quiz-container");

  container.innerHTML = `
    <p><strong>คำถาม:</strong> ${q.question}</p>
    <input type="text" id="user-answer" placeholder="คำตอบของคุณ"><br><br>
    <button onclick="checkAnswer('${q.answer}')">ตรวจคำตอบ</button>
  `;
}

function checkAnswer(correct) {
  const user = document.getElementById("user-answer").value.trim();
  if (user === correct) {
    alert("✅ ถูกต้อง!");
  } else {
    alert("❌ คำตอบที่ถูกคือ: " + correct);
  }
}

// Register service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("SW registered"))
    .catch(err => console.log("SW registration failed:", err));
}
