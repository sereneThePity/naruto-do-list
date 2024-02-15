const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const progress = document.getElementById('progress');
const colorPicker = document.getElementById('progressColor'); 
const colorPickerProgressBarbg = document.getElementById('progressBarColor')

addTaskBtn.addEventListener('click', addTask);
colorPicker.addEventListener('input', updateProgressBarColor); 
colorPickerProgressBarbg.addEventListener('input',updateProgressBarbgColor)

function addTask(e) {
  e.preventDefault()
  const taskText = taskInput.value;
  if (taskText !== '') {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    taskElement.appendChild(taskSpan);
    taskElement.reward = { type: 'select', data: null };      

    const completeIcon = document.createElement('div');
    completeIcon.classList.add('complete-icon');
    completeIcon.addEventListener('click', () => {
      taskElement.classList.toggle('completed');
      if(taskElement.classList.contains('completed')){
          handleReward(taskElement);
      }
      updateProgress();
    });
    taskElement.appendChild(completeIcon);

    const removeIcon = document.createElement('div');
    removeIcon.classList.add('remove-icon');
    removeIcon.addEventListener('click',()=>{
      taskElement.remove()
      updateProgress()
    })
    taskElement.appendChild(removeIcon)

    const rewardDropdown = document.createElement('select');
    rewardDropdown.classList.add('reward-dropdown');
    const rewardOptions = ['select','food', 'youtube', 'break', 'zen'];
    rewardOptions.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.textContent = option.charAt(0).toUpperCase() + option.slice(1);
      rewardDropdown.appendChild(optionElement);
    });
    rewardDropdown.addEventListener('change', () => {
      handleRewardSelection(taskElement, rewardDropdown.value);
    });
    taskElement.appendChild(rewardDropdown);
    taskList.appendChild(taskElement);

    taskInput.value = '';
    updateProgress();
    }
  }

function updateProgress() {
  const progressIcon = document.querySelector('.progress-icon')
  const completedTasks = document.querySelectorAll('.completed');
  const totalTasks = document.querySelectorAll('.task');
  const percentage = totalTasks.length === 0 ? 0 : (completedTasks.length / totalTasks.length) * 100;
  progress.style.width = `${percentage}%`;
  let progressIconShift = (percentage<33) ? 70 + (percentage/10) : 85 + (percentage/10)
  progressIcon.style.left = `${progressIconShift}%`

  if (percentage>0) progress.classList.add('glow')
  else progress.classList.remove('glow')
}
  
function updateProgressBarColor() {
  const selectedColor = colorPicker.value;
  progress.style.background = selectedColor;
}

function updateProgressBarbgColor(){
  const selectedColor = colorPickerProgressBarbg.value
  const progressBarbg = document.querySelector('.progress-bar')
  progressBarbg.style.background = selectedColor
}

function handleRewardSelection(taskElement, rewardType) {
  if (taskElement.classList.contains('completed')) {
    taskElement.reward = {data:null}
      return taskElement.querySelector('select').value='select'
    }
  switch (rewardType) {
  case 'select':
    taskElement.reward = {type: rewardType, data:null}
    break
  case 'food':
    const foodChoice = prompt('What would you like to eat after the task is completed?');
    if (foodChoice===null){
      return taskElement.querySelector('select').value='select'
    }
    taskElement.reward = { type: rewardType, data: foodChoice };
    break;
  case 'youtube':
    const youtubeLink = prompt('Enter the YouTube link you would like to view after the task is completed:');
    if (youtubeLink===null) {
      return taskElement.querySelector('select').value='select'
    }
    taskElement.reward = { type: rewardType, data: youtubeLink };
    break;
  case 'break':
    const breakDuration = prompt('How long would you like your break to be (in minutes)?');
    if (breakDuration===null) {
      return taskElement.querySelector('select').value='select'
    }
    taskElement.reward = { type: rewardType, data: breakDuration };
    break;
  case 'zen':
    taskElement = { type: rewardType };
    break;
  }
  console.log(taskElement.reward)
}  

function handleReward(taskElement) {
  const reward = taskElement.reward;
  console.log(reward)
  if (!reward) {
    console.log('No reward information for this task.');
    return;
  }

  switch (reward.type) {
    case 'food':
      const foodChoice = reward.data;
      alert(`Feast on some ${foodChoice} now!`);
      break;
    case 'youtube':
      const youtubeLink = reward.data;
      if (youtubeLink) {
        window.open(youtubeLink, '_blank');
      }
      break;
    case 'break':
      const breakDuration = +reward.data;
      if (Number.isInteger(breakDuration)) {
          setTimeout(() => {
              window.location.href = `timer.html?duration=${encodeURIComponent(breakDuration)}`;
          }, 400);
        }
      break;
    case 'zen':
      // Placeholder for the zen option logic
      console.log('Zen option selected');
      break;
    default:
      console.log('Unknown reward type');
    }
  }

  




