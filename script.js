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
const questionNumbers = document.querySelectorAll(".question-number");
const nextBtn = document.getElementById("nextBtn");
const musicToggleBtn = document.getElementById("musicToggle");

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
const MAX_QUESTION_LENGTH = 50; // Characters including spaces and punctuation
const NORMAL_FONT_SIZE = "24px";
const SMALL_FONT_SIZE = "20px";
const VERY_SMALL_FONT_SIZE = "18px";

// Navigation Functions
function showMainMenu() {
  mainMenu.classList.add("active");
  gamePage.classList.remove("active");
  resetLifelines();
  resetGame();
  
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
}

// Function to play menu music
function playMenuMusic() {
  if (menuMusicEnabled) {
    menuMusic.currentTime = 0;
    menuMusic.play().catch(e => {
      console.log("Menu music play failed:", e);
      // If autoplay is blocked, we'll try again on user interaction
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

// Function to toggle menu music
function toggleMenuMusic() {
  menuMusicEnabled = !menuMusicEnabled;
  
  if (musicToggleBtn) {
    if (menuMusicEnabled) {
      musicToggleBtn.innerHTML = '<i class="fas fa-volume-up"></i> Music';
      musicToggleBtn.classList.remove("muted");
      playMenuMusic();
    } else {
      musicToggleBtn.innerHTML = '<i class="fas fa-volume-mute"></i> Music';
      musicToggleBtn.classList.add("muted");
      stopMenuMusic();
    }
  }
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
  
  // Reset answer buttons
  answerBtns.forEach(btn => {
    btn.classList.remove("correct", "wrong", "disabled");
    btn.style.visibility = "visible";
    btn.style.opacity = "1";
    btn.disabled = false;
    btn.style.pointerEvents = "auto";
  });
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
  
  // Mark this question as answered in the grid
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
  
  // Reset lifelines for the new question (if not used yet)
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
  
  // Simulate friend's answer after closing popup
  setTimeout(() => {
    const correct = questions[currentQuestion].correct;
    const confidence = Math.random() > 0.2 ? "highly confident" : "not completely sure";
    alert(`📞 Your friend says: "I'm ${confidence} it's ${String.fromCharCode(65 + correct)}"`);
  }, 500);
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

// Reset lifelines
function resetLifelines() {
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

// Music Toggle Event Listener
if (musicToggleBtn) {
  musicToggleBtn.addEventListener("click", toggleMenuMusic);
}

// Number Grid Click Events
questionNumbers.forEach(numberBtn => {
  numberBtn.addEventListener("click", () => {
    const questionIndex = parseInt(numberBtn.dataset.question);
    if (!answeredQuestions.has(questionIndex) && questionIndex < questions.length) {
      // Ensure background sound is running for the selected question
      if (backgroundSoundEnabled) {
        backgroundSound.currentTime = 0;
      }
      loadQuestion(questionIndex);
      showGamePage();
    }
  });
});

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
});

// Initialize the game
showMainMenu();

// Also try to play menu music immediately on page load
document.addEventListener('DOMContentLoaded', function() {
  // Small delay to ensure page is loaded
  setTimeout(() => {
    if (mainMenu.classList.contains("active")) {
      playMenuMusic();
    }
  }, 500);
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Only handle keyboard shortcuts in game page
  if (!gamePage.classList.contains('active')) return;
  
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
  
  // M for music toggle (in main menu)
  if (e.key === 'm' && mainMenu.classList.contains("active") && musicToggleBtn) {
    toggleMenuMusic();
  }
});
