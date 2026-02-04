// State
let count = 0;
let timerID = null;

// DOM Elements
const display = document.getElementById('counter-display');
const incrementBtn = document.getElementById('increment-btn');
const decrementBtn = document.getElementById('decrement-btn');
const resetBtn = document.getElementById('reset-btn');
const autoCountBtn = document.getElementById('auto-count-btn');

// Update UI
function updateDisplay() {
  display.textContent = count;

  display.classList.remove(
    'text-indigo-600',
    'text-green-600',
    'text-red-600',
    'text-yellow-600'
  );

  if (count > 0) {
    display.classList.add('text-green-600');
  } else if (count < 0) {
    display.classList.add('text-red-600');
  } else {
    display.classList.add('text-indigo-600');
  }
}

// Auto Count Logic
function autoCountLogic() {
  if (count === 0) {
    stopAutoCount("Finished!");
    return;
  }

  if (count > 0) {
    count--;
  } else {
    count++;
  }

  updateDisplay();
}

function stopAutoCount(message = "Stopped!") {
  if (timerID !== null) {
    clearInterval(timerID);
    timerID = null;

    autoCountBtn.textContent = 'Start Auto-Count';
    autoCountBtn.classList.remove('bg-yellow-500', 'hover:bg-yellow-600');
    autoCountBtn.classList.add('bg-green-500', 'hover:bg-green-600');

    console.log(message);
  }
}

function startAutoCount() {
  if (timerID === null && count !== 0) {
    timerID = setInterval(autoCountLogic, 1000);

    autoCountBtn.textContent = 'Stop Auto-Count';
    autoCountBtn.classList.remove('bg-green-500', 'hover:bg-green-600');
    autoCountBtn.classList.add('bg-yellow-500', 'hover:bg-yellow-600');

    console.log("Auto-count started.");
  } else if (count === 0) {
    console.log("Counter is already at zero.");
  } else {
    stopAutoCount("Manually stopped.");
  }
}

// Event Listeners
incrementBtn.addEventListener('click', () => {
  stopAutoCount("Manual adjustment.");
  count++;
  updateDisplay();
});

decrementBtn.addEventListener('click', () => {
  stopAutoCount("Manual adjustment.");
  count--;
  updateDisplay();
});

resetBtn.addEventListener('click', () => {
  stopAutoCount("Reset.");
  count = 0;
  updateDisplay();
});

autoCountBtn.addEventListener('click', startAutoCount);

// Init
updateDisplay();
