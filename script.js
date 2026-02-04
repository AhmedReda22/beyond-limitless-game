const questions = [
  {
    question: "Do you know what 111 means to the immunology team?",
    answers: [
      "Osama's Birthday is on 11.1",
      "Immunology's ambition in 2026",
      "Immunology's budget for 2026",
      "Immunology's achievement in 2025"
    ],
    correct: 0
  },
  {
    question: "Where did Shereen spend more than half of her life?",
    answers: [
      "UAE/Jordan/KSA",
      "UAE/Libya/KSA",
      "UAE/Syria/Jordan",
      "UAE/USA/Libya"
    ],
    correct: 0
  },
  {
    question: "What were Eyecare's key priorities in 2025 under the umbrella of Maximize limitless 11?",
    answers: [
      "Aim & Elevate",
      "Rise & Shine",
      "Accelerate & Protect",
      "Elevate & Amplify"
    ],
    correct: 2
  },
  {
    question: "How many interventional clinical trials are currently ongoing in the UAE?",
    answers: [
      "1",
      "2",
      "3",
      "4"
    ],
    correct: 2
  },
  {
    question: "Given Iraq is selected country in International Growth Strategy, what is the main key driver behind Iraq success?",
    answers: [
      "Team",
      "Strategy",
      "Execution",
      "Partnerships"
    ],
    correct: 0
  },
  {
    question: "How long does it take to approve new indication in UAE?",
    answers: [
      "1 week",
      "1 month",
      "3 months",
      "Complicated"
    ],
    correct: 2
  },
  {
    question: "From an access perspective, which aspect do you think is most important?",
    answers: [
      "Accelerating Reimbursement",
      "Securing high brand value ($)",
      "Expanding access to more patients",
      "All of the above"
    ],
    correct: 3
  },
  {
    question: "What is Aseel's university major?",
    answers: [
      "Biochemistry",
      "Pharmacy",
      "Media & Communication",
      "Acting"
    ],
    correct: 1
  },
  {
    question: "How many distributors we currently have in Gulf Levant?",
    answers: [
      "19",
      "10",
      "15",
      "12"
    ],
    correct: 2
  },
  {
    question: "Where is Melania from?",
    answers: [
      "Slovakia",
      "Slovenia",
      "Romania",
      "Russia"
    ],
    correct: 1
  },
  {
    question: "Based on 2025 employee survey results for Gulf Levant for commercial, what was our engagement rate?",
    answers: [
      "89%",
      "91%",
      "93%",
      "95%"
    ],
    correct: 2
  },
  {
    question: "Why HR and CEx appear together in culture and future readiness sessions?",
    answers: [
      "Shaping employee engagement",
      "Shaping Culture",
      "Shaping Business Operations Excellence",
      "All of the above"
    ],
    correct: 3
  }
];

// DOM Elements
const mainMenu = document.getElementById("mainMenu");
const gamePage = document.getElementById("gamePage");
const questionEl = document.getElementById("question");
const answerBtns = document.querySelectorAll(".answer");
const startBtn = document.getElementById("startGame");
const homeBtn = document.getElementById("homeBtn");
const questionNumbers = document.querySelectorAll(".question-number");
const nextBtn = document.getElementById("nextBtn");

// Popup Elements
const phonePopup = document.getElementById("phonePopup");
const audiencePopup = document.getElementById("audiencePopup");
const closePhonePopup = document.getElementById("closePhonePopup");
const closeAudiencePopup = document.getElementById("closeAudiencePopup");
const audienceA = document.getElementById("audienceA");
const audienceB = document.getElementById("audienceB");
const audienceC = document.getElementById("audienceC");
const audienceD = document.getElementById("audienceD");

let currentQuestion = 0;
let answeredQuestions = new Set();
let lifelinesUsed = {
  fifty: false,
  audience: false,
  phone: false
};
let answeredCorrectly = false;
let selectedAnswerIndex = null;

// Navigation Functions
function showMainMenu() {
  mainMenu.classList.add("active");
  gamePage.classList.remove("active");
  resetLifelines();
  resetGame();
}

function showGamePage() {
  mainMenu.classList.remove("active");
  gamePage.classList.add("active");
}

// Reset game state
function resetGame() {
  currentQuestion = 0;
  answeredQuestions.clear();
  answeredCorrectly = false;
  selectedAnswerIndex = null;
  nextBtn.disabled = true;
  
  // Reset question numbers display
  questionNumbers.forEach((btn, index) => {
    btn.textContent = index + 1;
    btn.classList.remove("answered");
  });
}

// Load Question
function loadQuestion(questionIndex) {
  currentQuestion = questionIndex;
  const q = questions[questionIndex];
  questionEl.textContent = q.question;

  answerBtns.forEach((btn, index) => {
    btn.textContent = `${String.fromCharCode(65 + index)}: ${q.answers[index]}`;
    btn.classList.remove("correct", "wrong");
    btn.style.visibility = "visible";
    btn.style.opacity = "1";
    btn.disabled = false;
    btn.style.pointerEvents = "auto";
  });

  // Mark this question as answered
  answeredQuestions.add(questionIndex);
  
  // Update the number grid
  if (questionNumbers[questionIndex]) {
    questionNumbers[questionIndex].classList.add("answered");
    questionNumbers[questionIndex].textContent = "✓";
  }
  
  // Reset next button
  nextBtn.disabled = true;
  answeredCorrectly = false;
  selectedAnswerIndex = null;
}

// Answer Selection
answerBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    if (selectedAnswerIndex !== null) return; // Prevent multiple selections
    
    const selected = parseInt(btn.dataset.index);
    selectedAnswerIndex = selected;
    const correct = questions[currentQuestion].correct;

    // Disable all buttons after selection
    answerBtns.forEach(b => b.disabled = true);

    if (selected === correct) {
      btn.classList.add("correct");
      answeredCorrectly = true;
      
      // Enable next button
      nextBtn.disabled = false;
    } else {
      btn.classList.add("wrong");
      answerBtns[correct].classList.add("correct");
      answeredCorrectly = false;
      
      // Still enable next button even if wrong
      nextBtn.disabled = false;
    }
  });
});

// Next Button Event
nextBtn.addEventListener("click", () => {
  if (currentQuestion < questions.length - 1) {
    loadQuestion(currentQuestion + 1);
  } else {
    if (answeredCorrectly) {
      alert("مبروك! لقد أجبت على جميع الأسئلة بنجاح! 🎉");
    } else {
      alert("لقد أنهيت جميع الأسئلة! شكراً للمشاركة!");
    }
    showMainMenu();
  }
});

// Phone Lifeline
document.getElementById("phone").addEventListener("click", () => {
  if (lifelinesUsed.phone || selectedAnswerIndex !== null) return;
  
  // Show popup
  phonePopup.style.display = "flex";
  
  // Mark as used
  lifelinesUsed.phone = true;
  document.getElementById("phone").classList.add("used");
});

// Close Phone Popup
closePhonePopup.addEventListener("click", () => {
  phonePopup.style.display = "none";
  
  // Simulate friend's answer after closing popup
  setTimeout(() => {
    const correct = questions[currentQuestion].correct;
    const confidence = Math.random() > 0.2 ? "highly confident" : "not completely sure";
    alert(`📞 Your friend says: "I'm ${confidence} it's ${String.fromCharCode(65 + correct)}"`);
  }, 500);
});

// Audience Lifeline
document.getElementById("audience").addEventListener("click", () => {
  if (lifelinesUsed.audience || selectedAnswerIndex !== null) return;
  
  const correct = questions[currentQuestion].correct;
  const percentages = generateAudiencePercentages(correct);
  
  // Update audience results
  audienceA.textContent = percentages[0];
  audienceB.textContent = percentages[1];
  audienceC.textContent = percentages[2];
  audienceD.textContent = percentages[3];
  
  // Set CSS variables for bar animation
  document.documentElement.style.setProperty('--width-a', percentages[0] + '%');
  document.documentElement.style.setProperty('--width-b', percentages[1] + '%');
  document.documentElement.style.setProperty('--width-c', percentages[2] + '%');
  document.documentElement.style.setProperty('--width-d', percentages[3] + '%');
  
  // Show popup
  audiencePopup.style.display = "flex";
  
  // Mark as used
  lifelinesUsed.audience = true;
  document.getElementById("audience").classList.add("used");
});

// Generate audience percentages
function generateAudiencePercentages(correct) {
  const percentages = [0, 0, 0, 0];
  
  // Give the correct answer highest percentage
  percentages[correct] = Math.floor(Math.random() * 30) + 60; // 60-90%
  
  // Distribute remaining percentage among other answers
  let remaining = 100 - percentages[correct];
  for (let i = 0; i < 4; i++) {
    if (i !== correct && remaining > 0) {
      let maxPercent = Math.min(remaining, Math.floor(remaining / (3 - i)));
      const percent = Math.floor(Math.random() * maxPercent) + 1;
      percentages[i] = percent;
      remaining -= percent;
    }
  }
  
  // Adjust last one if needed
  if (remaining > 0) {
    percentages[correct] += remaining;
  }
  
  return percentages;
}

// Close Audience Popup
closeAudiencePopup.addEventListener("click", () => {
  audiencePopup.style.display = "none";
});

// 50:50 Lifeline
document.getElementById("fifty").addEventListener("click", () => {
  if (lifelinesUsed.fifty || selectedAnswerIndex !== null) return;
  
  const correct = questions[currentQuestion].correct;
  let wrongAnswers = [0, 1, 2, 3].filter(i => i !== correct);
  
  // Randomly remove two wrong answers
  wrongAnswers.sort(() => Math.random() - 0.5);
  wrongAnswers.slice(0, 2).forEach(index => {
    answerBtns[index].style.opacity = "0.3";
    answerBtns[index].style.pointerEvents = "none";
  });

  document.getElementById("fifty").classList.add("used");
  lifelinesUsed.fifty = true;
});

// Event Listeners for Navigation
startBtn.addEventListener("click", () => {
  resetGame();
  loadQuestion(0);
  showGamePage();
});

homeBtn.addEventListener("click", showMainMenu);

// Number Grid Click Events
questionNumbers.forEach(numberBtn => {
  numberBtn.addEventListener("click", () => {
    const questionIndex = parseInt(numberBtn.dataset.question);
    if (!answeredQuestions.has(questionIndex) && questionIndex < questions.length) {
      loadQuestion(questionIndex);
      showGamePage();
    }
  });
});

// Reset lifelines
function resetLifelines() {
  lifelinesUsed = {
    fifty: false,
    audience: false,
    phone: false
  };
  
  // Reset lifeline buttons
  document.querySelectorAll('.lifeline').forEach(btn => {
    btn.classList.remove('used');
  });
  
  // Hide popups
  phonePopup.style.display = "none";
  audiencePopup.style.display = "none";
}

// Initialize
showMainMenu();