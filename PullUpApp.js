// & BALL CURSOR BALL CURSOR BALL CURSOR BALL CURSOR 

// Select the ball cursor element
const ballCursor = document.querySelector('.ball-cursor');

// Track mouse movement
document.addEventListener('mousemove', (e) => {
    // Update the position of the ball cursor
    ballCursor.style.left = `${e.clientX}px`;
    ballCursor.style.top = `${e.clientY}px`;
});

const hoverElement = document.querySelector('.hover-element');

hoverElement.addEventListener("mouseenter", () => {
    ballCursor.style.width = '20px';
    ballCursor.style.height = '20px';
    ballCursor.style.backgroundColor = '#2c2e32';
});

hoverElement.addEventListener('mouseleave', () => {
    ballCursor.style.width = '12px';
    ballCursor.style.height = '12px';
    ballCursor.style.backgroundColor = 'white';
});
// & BALL CURSOR BALL CURSOR BALL CURSOR BALL CURSOR 

// ^ SELECT A WORKOUT  SELECT A WORKOUT  SELECT A WORKOUT 

// ? START WORKOUT--START WORKOUT--START WORKOUT--START WORKOUT 
let addReps = 0;
let total = document.querySelector('.total-reps');
let totalReps = document.querySelector('.update-count');

function addOne(){
    addReps += 1;
    total.innerText = addReps;
}
function addFive(){
    addReps += 5;
    total.innerText = addReps;
}
function addTen(){
    addReps += 10;
    total.innerText = addReps;
}

const currentDateElement = document.querySelector('.current-date');
const todaysDate = new Date();

function clock(){
    const currentDateElement = document.querySelector('.current-date');
    const todaysDate = new Date();
    // Format the date
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour:'2-digit', minute:'2-digit', second:'2-digit' };

    const formattedDate = todaysDate.toLocaleDateString(undefined, options);
    currentDateElement.textContent = formattedDate;

}
clock();
setInterval(clock, 1000);
// Display the date


// Select timer and display
const timerDisplay = document.querySelector('.timer-display');
const startWorkout = document.querySelector('.start-btn');

const applyPull = document.querySelector('.pull-day').addEventListener('click',() =>{
    const applyPull = document.querySelector('.pull-day');
    const applyWorkout = document.querySelector('.type-input');
    applyWorkout.value = applyPull.innerText;

})
const applyPush= document.querySelector('.push-day').addEventListener('click',() =>{
    const applyWorkout = document.querySelector('.type-input');
    applyWorkout.value = applyPush.innerText;
})
const applyCore = document.querySelector('.core-day').addEventListener('click',() =>{
    const applyWorkout = document.querySelector('.type-input');
    applyWorkout.value = applyWorkout.innerText;
    
})
const applyDuration = document.querySelector('.duration-input');
const applyReps = document.querySelector('.reps-input');

let timer = 0;
let intervalId = null;

startWorkout.addEventListener('click', () => {
    if(startWorkout.innerText === 'Start Workout'){
        intervalId = setInterval(() =>{
            timer++
            const hours = Math.floor(timer / 3600);
            const minutes = Math.floor((timer % 3600) / 60);
            const seconds = timer % 60;
            timerDisplay.innerText = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
        }, 1000)

        startWorkout.innerText = 'Stop Workout'
    }
    else if(startWorkout.innerText === 'Stop Workout'){
        clearInterval(intervalId)
        intervalId = null;
        startWorkout.innerText = 'Start Workout'
        applyDuration.value = timerDisplay.innerText;
        applyReps.value = total.innerText;

    }
});


// ? START WORKOUT--START WORKOUT--START WORKOUT--START WORKOUT 


// ^ SELECT A WORKOUT  SELECT A WORKOUT  SELECT A WORKOUT 


// & SAVE DATA SECTION 3 // ^ SAVE DATA SECTION 3 // ^ SAVE DATA SECTION 3

// * GRAB WORKOUT -------------------------------------------------------
const initiateSave = document.querySelector('.save-workout-btn');
initiateSave.addEventListener('click', () =>{
    const workoutInput = document.querySelector('.type-input').value
    const repsInput = document.querySelector('.reps-input').value
    const timeInput = document.querySelector('.duration-input').value

    if (!workoutInput || !repsInput || !timeInput) { 
        alert('Please fill out all fields!');
        return;
    };
    const todaysDate = new Date();
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const formattedDate = todaysDate.toLocaleDateString(undefined, options);

    const workout = { Date: formattedDate, Workout: workoutInput, Reps: repsInput, Time: timeInput };

    saveWorkout(workout);
    loadWorkouts();

    document.querySelector('.workout-input').value = '';
    document.querySelector('.reps-input').value = '';
    document.querySelector('.duration-input').value = '';
});
// -----------------------------------------------------------------------

// ^ LOAD WORKOUTS
function loadWorkouts(){
    const savedWorkouts = JSON.parse(localStorage.getItem('workouts')) || [];
    const savedWorkoutsContainer = document.querySelector('.saved-workouts');

    savedWorkoutsContainer.innerHTML = '';
    savedWorkouts.forEach((workout, index) => {
        displayWorkout(workout, index)
    });
};
// -----------------------------------------------------------------------

// ! ACTUALLY SAVE WORKOUTS IN STORAGE
function saveWorkout(workout){
    const savedWorkouts = JSON.parse(localStorage.getItem('workouts')) || [];
    const index = savedWorkouts.length;
    savedWorkouts.push(workout);
    localStorage.setItem('workouts', JSON.stringify(savedWorkouts))

}
// -----------------------------------------------------------------------

// ~ LASTLY DISPLAY WORKOUTS ---------------------------------------------

function displayWorkout(workout, index) {

    const workoutContainer = document.createElement('div');
    workoutContainer.innerHTML = 
    `<div class="workout-title">
    <p class="display-data" id="display-date">${workout.Date}</p> 
    <p class="display-data title-data">Type:${workout.Workout}</p> 
    <p class="display-data title-data">Reps:${workout.Reps}</p>
    <p class="display-data title-data">Duration:${workout.Time}</p>
    <button class = "delete-data">Delete</button>
    </div>`
    
    const savedWorkoutsContainer = document.querySelector('.saved-workouts');
    savedWorkoutsContainer.appendChild(workoutContainer);

    const deleteData = workoutContainer.querySelector('.delete-data');
    deleteData.addEventListener('click',() => {
        deleteWorkout(index);
    });
};
// -----------------------------------------------------------------------

// ^DELETE WORKOUT ------------------------------------------------------
function deleteWorkout(index) {
    const savedWorkouts = JSON.parse(localStorage.getItem('workouts')) || [];
    savedWorkouts.splice(index, 1);
    localStorage.setItem('workouts', JSON.stringify(savedWorkouts));
    loadWorkouts();
  }

document.addEventListener('DOMContentLoaded', loadWorkouts);
// -----------------------------------------------------------------------