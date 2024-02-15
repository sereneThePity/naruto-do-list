const queryParams = new URLSearchParams(window.location.search);
    const breakDuration = parseInt(queryParams.get('duration'), 10) || 0;

    let timeRemaining = breakDuration * 60; // Convert to seconds

    function updateTimerDisplay() {
      const minutes = Math.floor(timeRemaining / 60);
      const seconds = timeRemaining % 60;
      document.getElementById('timer').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    function startTimer() {
      if (timeRemaining > 0) {
        updateTimerDisplay();
        timeRemaining--;
        setTimeout(startTimer, 1000); // Update every second
      } else {
        document.getElementById('timer').textContent = 'Break time is over!';
      }
    }

    startTimer();