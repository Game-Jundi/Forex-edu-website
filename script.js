function submitAnswer(selectElem, id) {
  const value = selectElem.value;
  const resultEl = document.getElementById('result-' + id);

  if (value === 'correct') {
    resultEl.textContent = '✅ Correct!';
    resultEl.style.color = 'green';
    localStorage.setItem('quiz-' + id, 'passed');
    updateProgress();
  } else {
    resultEl.textContent = '❌ Try again!';
    resultEl.style.color = 'red';
  }
  

}

// Update the progress bar
function updateProgress() {
  const totalQuizzes = 13; 
  let passedCount = 0;
  
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith("quiz-") && localStorage.getItem(key) === "passed") {
      passedCount++;
    }
  });

  const progressPercent = (passedCount / totalQuizzes) * 100;
  document.getElementById('progress-bar').style.width = progressPercent + "%";
}

// When page loads, update progress
window.onload = () => {
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith("quiz-") && localStorage.getItem(key) === "passed") {
      const resultId = key.replace("quiz-", "result-");
      const resultEl = document.getElementById(resultId);
      if (resultEl) {
        resultEl.textContent = '✅ Already Passed!';
        resultEl.style.color = 'green';
        

      }
    }
  });

  
  updateProgress();
};

// Scroll Animation
const scrollElements = document.querySelectorAll(".scroll-hidden");

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("scroll-visible");
      scrollObserver.unobserve(entry.target);
    }
  });
});


