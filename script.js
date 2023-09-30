// Array to store active timers
const activeTimers = [];

// Function to format time as HH:MM:SS
function formatTime(hours, minutes, seconds) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Function to update timer display
function updateTimerDisplay(timerElement, timer) {
    const { hours, minutes, seconds } = timer;
    timerElement.textContent = formatTime(hours, minutes, seconds);
}

// Function to start a new timer
function startNewTimer() {
    const hoursInput = parseInt(document.getElementById("hours").value) || 0;
    const minutesInput = parseInt(document.getElementById("minutes").value) || 0;
    const secondsInput = parseInt(document.getElementById("seconds").value) || 0;

    if (hoursInput === 0 && minutesInput === 0 && secondsInput === 0) {
        alert("Please enter a valid time.");
        return;
    }

    const timer = {
        hours: hoursInput,
        minutes: minutesInput,
        seconds: secondsInput,
        intervalId: null
    };

    const timerElement = document.createElement("div");
    timerElement.classList.add("timer");

    updateTimerDisplay(timerElement, timer);

    // Start the timer interval
    timer.intervalId = setInterval(function () {
        if (timer.seconds > 0) {
            timer.seconds--;
        } else if (timer.minutes > 0) {
            timer.minutes--;
            timer.seconds = 59;
        } else if (timer.hours > 0) {
            timer.hours--;
            timer.minutes = 59;
            timer.seconds = 59;
        } else {
            // Timer has reached zero
            clearInterval(timer.intervalId);
            timerElement.classList.add("timer-ended"); // Apply end display style
        }

        updateTimerDisplay(timerElement, timer);
    }, 1000);

    activeTimers.push(timer);

    // Display the timer in the active timers section
    const activeTimersSection = document.querySelector(".active-timers-section");
    activeTimersSection.appendChild(timerElement);
}



// Event listener for the "Start New Timer" button
document.getElementById("start-timer").addEventListener("click", startNewTimer);
