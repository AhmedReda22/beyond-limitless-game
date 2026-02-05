// Questions Data
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
const nextBtn = document.getElementById("nextBtn");

// Audio Elements
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const backgroundSound = document.getElementById("backgroundSound");
const menuMusic = document.getElementById("menuMusic");

// Popup Elements
const phonePopup = document.getElementById("phonePopup");
const audiencePopup = document.getElementById("audiencePopup");
const closePhonePopup = document.getElementById("closePhonePopup");
const closeAudiencePopup = document.getElementById("closeAudiencePopup");

// العناصر الجديدة للأسئلة
const questionsIcon = document.getElementById("questionsIcon");
const questionsPopup = document.getElementById("questionsPopup");
const closeQuestionsPopup = document.getElementById("closeQuestionsPopup");
const questionsList = document.querySelector(".questions-list");

// Lifeline Buttons
const fiftyLifeline = document.getElementById("fifty");
const audienceLifeline = document.getElementById("audience");
const phoneLifeline = document.getElementById("phone");

// Game State Variables
let currentQuestion = 0;
let answeredQuestions = new Set();
let lifelinesUsed = {
  fifty: false,
  audience: false,
  phone: false
};
let answeredCorrectly = false;
let selectedAnswerIndex = null;
let backgroundSoundEnabled = true;
let menuMusicEnabled = true;

// Font Size Variables
const MAX_QUESTION_LENGTH = 50;
const NORMAL_FONT_SIZE = "24px";
const SMALL_FONT_SIZE = "20px";
const VERY_SMALL_FONT_SIZE = "18px";

// ==============================================
// وظائف إدارة وسائل المساعدة
// ==============================================

// وظيفة: إعادة تعيين وسائل المساعدة للسؤال الحالي فقط
function resetLifelinesForCurrentQuestion() {
  // إعادة تعيين حالة الاستخدام لوسائل المساعدة للسؤال الحالي فقط
  lifelinesUsed = {
    fifty: false,
    audience: false,
    phone: false
  };
  
  // إعادة تعيين أزرار وسائل المساعدة (إزالة حالة المستخدم)
  [fiftyLifeline, audienceLifeline, phoneLifeline].forEach(btn => {
    if (btn) btn.classList.remove('used');
  });
  
  console.log("وسائل المساعدة أعيد تعيينها للسؤال الجديد");
}

// وظيفة: إعادة تعيين وسائل المساعدة بالكامل (للعبة الجديدة)
function resetAllLifelines() {
  lifelinesUsed = {
    fifty: false,
    audience: false,
    phone: false
  };
  
  // Reset lifeline buttons
  [fiftyLifeline, audienceLifeline, phoneLifeline].forEach(btn => {
    if (btn) btn.classList.remove('used');
  });
  
  // Hide popups
  phonePopup.style.display = "none";
  audiencePopup.style.display = "none";
  questionsPopup.style.display = "none";
}

// ==============================================
// وظائف التنقل والعرض
// ==============================================

// Function to show/hide home button based on current page
function updateHomeButtonVisibility() {
  if (gamePage.classList.contains('active')) {
    homeBtn.style.display = 'flex'; // Show in game page
  } else {
    homeBtn.style.display = 'none'; // Hide in main menu
  }
}

// Navigation Functions
function showMainMenu() {
  mainMenu.classList.add("active");
  gamePage.classList.remove("active");
  resetAllLifelines();
  resetGame();
  
  // إخفاء زر Home
  homeBtn.style.display = 'none';
  
  // Stop game background sound when returning to main menu
  if (backgroundSoundEnabled && !backgroundSound.paused) {
    backgroundSound.pause();
    backgroundSound.currentTime = 0;
  }
  
  // Play menu music when showing main menu
  playMenuMusic();
}

function showGamePage() {
  mainMenu.classList.remove("active");
  gamePage.classList.add("active");
  
  // إظهار زر Home
  homeBtn.style.display = 'flex';
  
  // Stop menu music when starting the game
  if (menuMusicEnabled && !menuMusic.paused) {
    menuMusic.pause();
    menuMusic.currentTime = 0;
  }
  
  // Play game background sound when starting the game
  if (backgroundSoundEnabled) {
    backgroundSound.currentTime = 0;
    backgroundSound.play().catch(e => {
      console.log("Auto-play prevented by browser. User interaction required.");
    });
  }
  
  // عند بدء اللعبة، تأكد من أن وسائل المساعدة متاحة
  resetLifelinesForCurrentQuestion();
}

// Function to play menu music
function playMenuMusic() {
  if (menuMusicEnabled) {
    menuMusic.currentTime = 0;
    menuMusic.play().catch(e => {
      console.log("Menu music play failed:", e);
    });
  }
}

// Function to stop menu music
function stopMenuMusic() {
  if (menuMusicEnabled && !menuMusic.paused) {
    menuMusic.pause();
    menuMusic.currentTime = 0;
  }
}

// ==============================================
// وظائف إدارة اللعبة
// ==============================================

// Reset game state
function resetGame() {
  currentQuestion = 0;
  answeredQuestions.clear();
  answeredCorrectly = false;
  selectedAnswerIndex = null;
  nextBtn.disabled = true;
  
  // Reset answer buttons
  answerBtns.forEach(btn => {
    btn.classList.remove("correct", "wrong", "disabled");
    btn.style.visibility = "visible";
    btn.style.opacity = "1";
    btn.disabled = false;
    btn.style.pointerEvents = "auto";
  });
  
  // إنشاء قائمة الأسئلة بعد إعادة تعيين اللعبة
  createQuestionsList();
  
  // إعادة تعيين وسائل المساعدة
  resetAllLifelines();
}

// Function to adjust question font size
function adjustQuestionFontSize(questionText) {
  const charCount = questionText.length;
  
  // Reset to normal size first
  questionEl.style.fontSize = NORMAL_FONT_SIZE;
  
  // Adjust based on character count
  if (charCount > 50 && charCount <= 80) {
    questionEl.style.fontSize = SMALL_FONT_SIZE;
  } else if (charCount > 80) {
    questionEl.style.fontSize = VERY_SMALL_FONT_SIZE;
  }
}

// Function to adjust answer font sizes
function adjustAnswerFontSize(answerTexts) {
  answerBtns.forEach((btn, index) => {
    const answerText = answerTexts[index];
    const charCount = answerText.length;
    
    // Reset to normal size
    btn.style.fontSize = "18px";
    
    // Adjust based on character count
    if (charCount > 30 && charCount <= 50) {
      btn.style.fontSize = "16px";
    } else if (charCount > 50) {
      btn.style.fontSize = "14px";
    }
  });
}

// ==============================================
// وظائف قائمة الأسئلة
// ==============================================

// إنشاء قائمة الأسئلة في الـ Popup
function createQuestionsList() {
  if (!questionsList) return;
  
  questionsList.innerHTML = "";
  
  questions.forEach((q, index) => {
    const questionItem = document.createElement("div");
    questionItem.className = "question-item";
    questionItem.dataset.index = index;
    
    const isAnswered = answeredQuestions.has(index);
    if (isAnswered) {
      questionItem.classList.add("answered");
    }
    
    questionItem.innerHTML = `
      <div class="question-number">Question ${index + 1}</div>
      <div class="question-text">${q.question}</div>
    `;
    
    questionItem.addEventListener("click", () => {
      // السماح باختيار السؤال حتى إذا كان قد تمت الإجابة عليه
      loadQuestion(index);
      showGamePage();
      
      // إعادة تعيين وسائل المساعدة عند اختيار سؤال جديد
      resetLifelinesForCurrentQuestion();
      
      // إغلاق الـ Popup
      questionsPopup.style.display = "none";
    });
    
    questionsList.appendChild(questionItem);
  });
}

// تحديث قائمة الأسئلة في الـ Popup
function updateQuestionsList() {
  const questionItems = document.querySelectorAll('.question-item');
  questionItems.forEach(item => {
    const index = parseInt(item.dataset.index);
    if (answeredQuestions.has(index)) {
      item.classList.add('answered');
    }
  });
}

// ==============================================
// وظائف تحميل الأسئلة
// ==============================================

// Load Question
function loadQuestion(questionIndex) {
  currentQuestion = questionIndex;
  const q = questions[questionIndex];
  questionEl.textContent = q.question;
  
  // Adjust question font size
  adjustQuestionFontSize(q.question);
  
  answerBtns.forEach((btn, index) => {
    btn.textContent = `${String.fromCharCode(65 + index)}: ${q.answers[index]}`;
    btn.classList.remove("correct", "wrong", "disabled");
    btn.style.visibility = "visible";
    btn.style.opacity = "1";
    btn.disabled = false;
    btn.style.pointerEvents = "auto";
    
    // Reset font size for answers
    btn.style.fontSize = "18px";
  });
  
  // Adjust answer font sizes
  adjustAnswerFontSize(q.answers);
  
  // تحديث الـ Popup ليعلم أن السؤال تمت الإجابة عليه
  updateQuestionsList();
  
  // Reset next button
  nextBtn.disabled = true;
  answeredCorrectly = false;
  selectedAnswerIndex = null;
  
  // إعادة تعيين وسائل المساعدة لهذا السؤال الجديد - الجزء المهم!
  resetLifelinesForCurrentQuestion();
  
  // Reset answer buttons state
  resetAnswerButtonsState();
  
  // Start background sound for new question
  if (backgroundSoundEnabled) {
    backgroundSound.currentTime = 0;
    backgroundSound.play().catch(e => {
      console.log("Background sound play failed:", e);
    });
  }
}

// Reset answer buttons to normal state (after 50:50 lifeline)
function resetAnswerButtonsState() {
  answerBtns.forEach(btn => {
    if (btn.style.opacity === "0.3") {
      btn.style.opacity = "1";
      btn.style.pointerEvents = "auto";
    }
  });
}

// ==============================================
// أحداث الأزرار والإجابات
// ==============================================

// Answer Selection
answerBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    if (selectedAnswerIndex !== null) return; // Prevent multiple selections
    
    const selected = parseInt(btn.dataset.index);
    selectedAnswerIndex = selected;
    const correct = questions[currentQuestion].correct;

    // Disable all buttons after selection
    answerBtns.forEach(b => {
      b.disabled = true;
      b.classList.add("disabled");
    });

    // Stop background sound when answering
    if (backgroundSoundEnabled && !backgroundSound.paused) {
      backgroundSound.pause();
    }

    if (selected === correct) {
      btn.classList.add("correct");
      answeredCorrectly = true;
      
      // Play correct answer sound
      if (backgroundSoundEnabled) {
        correctSound.currentTime = 0;
        correctSound.play();
      }
      
      // Enable next button
      nextBtn.disabled = false;
      
      // Mark question as answered
      answeredQuestions.add(currentQuestion);
    } else {
      btn.classList.add("wrong");
      answerBtns[correct].classList.add("correct");
      answeredCorrectly = false;
      
      // Play wrong answer sound
      if (backgroundSoundEnabled) {
        wrongSound.currentTime = 0;
        wrongSound.play();
      }
      
      // Still enable next button even if wrong
      nextBtn.disabled = false;
      
      // Mark question as answered
      answeredQuestions.add(currentQuestion);
    }
  });
});

// Next Button Event
nextBtn.addEventListener("click", () => {
  // Resume background sound for the next question
  if (backgroundSoundEnabled && currentQuestion < questions.length - 1) {
    backgroundSound.currentTime = 0;
    backgroundSound.play().catch(e => {
      console.log("Background sound play failed on next:", e);
    });
  }
  
  if (currentQuestion < questions.length - 1) {
    loadQuestion(currentQuestion + 1);
  } else {
    // Stop all sounds when game ends
    backgroundSound.pause();
    backgroundSound.currentTime = 0;
    
    if (answeredCorrectly) {
      alert("مبروك! لقد أجبت على جميع الأسئلة بنجاح! 🎉");
    } else {
      alert("لقد أنهيت جميع الأسئلة! شكراً للمشاركة!");
    }
    showMainMenu();
  }
});

// ==============================================
// وظائف وسائل المساعدة (Lifelines)
// ==============================================

// Phone Lifeline
phoneLifeline.addEventListener("click", () => {
  if (lifelinesUsed.phone || selectedAnswerIndex !== null) return;
  
  // Show popup
  phonePopup.style.display = "flex";
  
  // Mark as used
  lifelinesUsed.phone = true;
  phoneLifeline.classList.add("used");
});

// Close Phone Popup
closePhonePopup.addEventListener("click", () => {
  phonePopup.style.display = "none";
});

// Audience Lifeline
audienceLifeline.addEventListener("click", () => {
  if (lifelinesUsed.audience || selectedAnswerIndex !== null) return;
  
  // Show popup with QR code instructions
  audiencePopup.style.display = "flex";
  
  // Mark as used
  lifelinesUsed.audience = true;
  audienceLifeline.classList.add("used");
});

// Close Audience Popup
closeAudiencePopup.addEventListener("click", () => {
  audiencePopup.style.display = "none";
});

// 50:50 Lifeline
fiftyLifeline.addEventListener("click", () => {
  if (lifelinesUsed.fifty || selectedAnswerIndex !== null) return;
  
  const correct = questions[currentQuestion].correct;
  let wrongAnswers = [0, 1, 2, 3].filter(i => i !== correct);
  
  // Randomly remove two wrong answers
  wrongAnswers.sort(() => Math.random() - 0.5);
  const toRemove = wrongAnswers.slice(0, 2);
  
  toRemove.forEach(index => {
    answerBtns[index].style.opacity = "0.3";
    answerBtns[index].style.pointerEvents = "none";
    answerBtns[index].classList.add("disabled");
  });

  // Mark as used
  fiftyLifeline.classList.add("used");
  lifelinesUsed.fifty = true;
});

// ==============================================
// أحداث الأزرار العامة
// ==============================================

// فتح Popup الأسئلة
if (questionsIcon) {
  questionsIcon.addEventListener("click", () => {
    createQuestionsList();
    questionsPopup.style.display = "flex";
  });
}

// إغلاق Popup الأسئلة
if (closeQuestionsPopup) {
  closeQuestionsPopup.addEventListener("click", () => {
    questionsPopup.style.display = "none";
  });
}

// Event Listeners for Navigation
startBtn.addEventListener("click", () => {
  // Ensure sounds are enabled when starting the game
  backgroundSoundEnabled = true;
  resetGame();
  loadQuestion(0);
  showGamePage();
});

homeBtn.addEventListener("click", showMainMenu);

// Handle user interaction for browser autoplay policies
document.addEventListener('click', function() {
  // On first user click, try to play background sounds if needed
  if (mainMenu.classList.contains("active") && menuMusicEnabled && menuMusic.paused) {
    playMenuMusic();
  }
  
  if (gamePage.classList.contains("active") && backgroundSoundEnabled && backgroundSound.paused) {
    backgroundSound.play().catch(e => {
      console.log("Browser prevented auto-play.");
    });
  }
}, { once: true });

// Close popups when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === phonePopup) {
    phonePopup.style.display = "none";
  }
  if (e.target === audiencePopup) {
    audiencePopup.style.display = "none";
  }
  if (e.target === questionsPopup) {
    questionsPopup.style.display = "none";
  }
});

// ==============================================
// التهيئة عند تحميل الصفحة
// ==============================================

// استدعاء الدالة عند التحميل
document.addEventListener('DOMContentLoaded', function() {
  // Small delay to ensure page is loaded
  setTimeout(() => {
    if (mainMenu.classList.contains("active")) {
      playMenuMusic();
    }
    // إنشاء قائمة الأسئلة عند تحميل الصفحة
    createQuestionsList();
    
    // تحديث ظهور زر Home
    updateHomeButtonVisibility();
  }, 500);
});

// ==============================================
// اختصارات لوحة المفاتيح
// ==============================================

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Only handle keyboard shortcuts in game page
  if (gamePage.classList.contains('active')) {
    // Number keys 1-4 for answers
    if (e.key >= '1' && e.key <= '4' && selectedAnswerIndex === null) {
      const index = parseInt(e.key) - 1;
      if (index < answerBtns.length) {
        answerBtns[index].click();
      }
    }
    
    // Space or Enter for next question
    if ((e.key === ' ' || e.key === 'Enter') && !nextBtn.disabled) {
      nextBtn.click();
    }
    
    // F for 50:50
    if (e.key === 'f' && !lifelinesUsed.fifty && selectedAnswerIndex === null) {
      fiftyLifeline.click();
    }
    
    // A for audience
    if (e.key === 'a' && !lifelinesUsed.audience && selectedAnswerIndex === null) {
      audienceLifeline.click();
    }
    
    // P for phone
    if (e.key === 'p' && !lifelinesUsed.phone && selectedAnswerIndex === null) {
      phoneLifeline.click();
    }
  }
  
  // Q لفتح قائمة الأسئلة في القائمة الرئيسية
  if ((e.key === 'q' || e.key === 'Q') && mainMenu.classList.contains("active")) {
    if (questionsIcon) questionsIcon.click();
  }
});

// ==============================================
// تهيئة اللعبة
// ==============================================

// Initialize the game
showMainMenu();
