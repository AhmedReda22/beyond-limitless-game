// =======================================================
// QUESTIONS DATA
// =======================================================
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
    answers: ["1","2","3","4"],
    correct: 2
  },
  {
    question: "Given Iraq is selected country in International Growth Strategy, what is the main key driver behind Iraq success?",
    answers: ["Team","Strategy","Execution","Partnerships"],
    correct: 0
  },
  {
    question: "How long does it take to approve new indication in UAE?",
    answers: ["1 week","1 month","3 months","Complicated"],
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
    answers: ["Biochemistry","Pharmacy","Media & Communication","Acting"],
    correct: 1
  },
  {
    question: "How many distributors we currently have in Gulf Levant?",
    answers: ["19","10","15","12"],
    correct: 2
  },
  {
    question: "Where is Melania from?",
    answers: ["Slovakia","Slovenia","Romania","Russia"],
    correct: 1
  },
  {
    question: "Based on 2025 employee survey results for Gulf Levant for commercial, what was our engagement rate?",
    answers: ["89%","91%","93%","95%"],
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

// =======================================================
// DOM ELEMENTS
// =======================================================
const mainMenu = document.getElementById("mainMenu");
const gamePage = document.getElementById("gamePage");
const questionEl = document.getElementById("question");
const answerBtns = document.querySelectorAll(".answer");
const startBtn = document.getElementById("startGame");
const homeBtn = document.getElementById("homeBtn");
const nextBtn = document.getElementById("nextBtn");

// Videos
const menuVideo = document.getElementById("menuVideo");
const gameVideo = document.getElementById("gameVideo");

// Sounds
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const backgroundSound = document.getElementById("backgroundSound");
const menuMusic = document.getElementById("menuMusic");

// Popups
const phonePopup = document.getElementById("phonePopup");
const audiencePopup = document.getElementById("audiencePopup");
const closePhonePopup = document.getElementById("closePhonePopup");
const closeAudiencePopup = document.getElementById("closeAudiencePopup");

// Questions popup
const questionsIcon = document.getElementById("questionsIcon");
const questionsPopup = document.getElementById("questionsPopup");
const closeQuestionsPopup = document.getElementById("closeQuestionsPopup");
const questionsList = document.querySelector(".questions-list");

// Lifelines
const fiftyLifeline = document.getElementById("fifty");
const audienceLifeline = document.getElementById("audience");
const phoneLifeline = document.getElementById("phone");

// =======================================================
// GAME STATE
// =======================================================
let currentQuestion = 0;
let answeredQuestions = new Set();
let selectedAnswerIndex = null;
let answeredCorrectly = false;

let lifelinesUsed = {
  fifty: false,
  audience: false,
  phone: false
};

// =======================================================
// VIDEO ENGINE
// =======================================================
function showMenuVideo() {
  if (!menuVideo || !gameVideo) return;
  menuVideo.classList.remove("hidden");
  gameVideo.classList.add("hidden");
  menuVideo.currentTime = 0;
  menuVideo.play().catch(()=>{});
  gameVideo.pause();
}

function showGameVideo() {
  if (!menuVideo || !gameVideo) return;
  gameVideo.classList.remove("hidden");
  menuVideo.classList.add("hidden");
  gameVideo.currentTime = 0;
  gameVideo.play().catch(()=>{});
  menuVideo.pause();
}

// =======================================================
// LIFELINES RESET
// =======================================================
function resetLifelinesForCurrentQuestion() {
  lifelinesUsed = { fifty:false, audience:false, phone:false };
  [fiftyLifeline, audienceLifeline, phoneLifeline].forEach(b=>b.classList.remove("used"));
}

// =======================================================
// NAVIGATION
// =======================================================
function showMainMenu() {
  mainMenu.classList.add("active");
  gamePage.classList.remove("active");
  homeBtn.style.display = "none";

  showMenuVideo();

  backgroundSound.pause();
  backgroundSound.currentTime = 0;

  menuMusic.currentTime = 0;
  menuMusic.play().catch(()=>{});
}

function showGamePage() {
  mainMenu.classList.remove("active");
  gamePage.classList.add("active");
  homeBtn.style.display = "flex";

  showGameVideo();

  menuMusic.pause();
  menuMusic.currentTime = 0;

  backgroundSound.currentTime = 0;
  backgroundSound.play().catch(()=>{});

  resetLifelinesForCurrentQuestion();
}

// =======================================================
// GAME FUNCTIONS
// =======================================================
function loadQuestion(index) {
  currentQuestion = index;
  const q = questions[index];
  questionEl.textContent = q.question;

  answerBtns.forEach((btn,i)=>{
    btn.textContent = `${String.fromCharCode(65+i)}: ${q.answers[i]}`;
    btn.className = "answer";
    btn.style.opacity = "1";
    btn.disabled = false;
  });

  selectedAnswerIndex = null;
  nextBtn.disabled = true;
}

function resetGame() {
  currentQuestion = 0;
  answeredQuestions.clear();
  loadQuestion(0);
}

// =======================================================
// ANSWERS
// =======================================================
answerBtns.forEach(btn=>{
  btn.addEventListener("click",()=>{
    if(selectedAnswerIndex!==null) return;
    const index = parseInt(btn.dataset.index);
    const correct = questions[currentQuestion].correct;
    selectedAnswerIndex = index;

    answerBtns.forEach(b=>b.disabled=true);

    if(index===correct){
      btn.classList.add("correct");
      correctSound.play();
      answeredCorrectly = true;
    } else {
      btn.classList.add("wrong");
      answerBtns[correct].classList.add("correct");
      wrongSound.play();
      answeredCorrectly = false;
    }

    answeredQuestions.add(currentQuestion);
    nextBtn.disabled = false;
  });
});

// =======================================================
// NEXT
// =======================================================
nextBtn.onclick = ()=>{
  if(currentQuestion < questions.length-1){
    loadQuestion(currentQuestion+1);
    resetLifelinesForCurrentQuestion();
  } else {
    alert("Game Finished 🎉");
    showMainMenu();
  }
};

// =======================================================
// LIFELINES
// =======================================================
fiftyLifeline.onclick = ()=>{
  if(lifelinesUsed.fifty || selectedAnswerIndex!==null) return;
  const correct = questions[currentQuestion].correct;
  let wrong = [0,1,2,3].filter(i=>i!==correct).sort(()=>0.5-Math.random()).slice(0,2);
  wrong.forEach(i=>{
    answerBtns[i].style.opacity="0.3";
    answerBtns[i].disabled=true;
  });
  lifelinesUsed.fifty = true;
  fiftyLifeline.classList.add("used");
};

phoneLifeline.onclick = ()=>{
  if(lifelinesUsed.phone) return;
  phonePopup.style.display="flex";
  lifelinesUsed.phone=true;
  phoneLifeline.classList.add("used");
};

audienceLifeline.onclick = ()=>{
  if(lifelinesUsed.audience) return;
  audiencePopup.style.display="flex";
  lifelinesUsed.audience=true;
  audienceLifeline.classList.add("used");
};

closePhonePopup.onclick=()=>phonePopup.style.display="none";
closeAudiencePopup.onclick=()=>audiencePopup.style.display="none";

// =======================================================
// QUESTIONS POPUP
// =======================================================
questionsIcon.onclick=()=>{
  questionsPopup.style.display="flex";
  questionsList.innerHTML="";
  questions.forEach((q,i)=>{
    const div=document.createElement("div");
    div.className="question-item";
    div.textContent=`Q${i+1}: ${q.question}`;
    div.onclick=()=>{
      loadQuestion(i);
      showGamePage();
      questionsPopup.style.display="none";
    };
    questionsList.appendChild(div);
  });
};

closeQuestionsPopup.onclick=()=>questionsPopup.style.display="none";

// =======================================================
// BUTTONS
// =======================================================
startBtn.onclick=()=>{
  resetGame();
  showGamePage();
};

homeBtn.onclick=showMainMenu;

// =======================================================
// INIT
// =======================================================
showMenuVideo();
showMainMenu();
