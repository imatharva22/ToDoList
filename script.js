document.getElementById('addTaskButton').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    // Create a new task item
    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;

    // Create a timer display for the task
    const timerDisplay = document.createElement('span');
    timerDisplay.className = 'timer-display';
    timerDisplay.textContent = 'Time Left: 25:00'; // Initial timer display (25 minutes)
    taskItem.appendChild(timerDisplay);

    // Add a delete button to the task item
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';
    deleteButton.addEventListener('click', function() {
        clearInterval(timerInterval); // Clear the timer when deleting the task
        taskItem.remove();
    });

    // Add an edit button to the task item
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit-button';
    editButton.addEventListener('click', function() {
        const newTaskText = prompt('Edit your task:', taskText);
        if (newTaskText) {
            taskItem.firstChild.nodeValue = newTaskText; // Update the task text
        }
        
        const newTime = prompt('Edit timer duration in minutes (default is 25):', '25');
        if (newTime !== null && !isNaN(newTime) && newTime > 0) {
            timeLeft = newTime * 60; // Update timeLeft to the new value in seconds
            timerDisplay.textContent = `Time Left: ${String(Math.floor(timeLeft / 60)).padStart(2, '0')}:${String(timeLeft % 60).padStart(2, '0')}`;
            clearInterval(timerInterval); // Clear existing timer
            startTimer(); // Start the timer with the new duration
        }
    });

    // Function to start the timer
    function startTimer() {
        timerInterval = setInterval(function() {
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                timerDisplay.textContent = 'Time is up!';
            } else {
                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;
                timerDisplay.textContent = `Time Left: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
                timeLeft--;
            }
        }, 1000);
    }

    document.getElementById('addTaskButton').addEventListener('click', function() {
        const taskInput = document.getElementById('taskInput');
        const taskList = document.getElementById('taskList');
        
        if (taskInput.value.trim() !== '') {
            const li = document.createElement('li');
            li.textContent = taskInput.value;
            li.classList.add('show'); // Add show class for animation
            taskList.appendChild(li);
            taskInput.value = ''; // Clear input field
        }
    });
    
    taskList.addEventListener('click', function(e) {
        if (e.target.tagName === 'LI') {
            e.target.classList.toggle('completed'); // Toggle completed class
        }
    });
    
    taskList.addEventListener('dblclick', function(e) {
        if (e.target.tagName === 'LI') {
            e.target.classList.add('removing'); // Add removing class for animation
            setTimeout(() => {
                e.target.remove(); // Remove the task after animation
            }, 300); // Match the duration of the fadeOut animation
        }
    });

    // Start a timer for the task (e.g., 25 minutes)
    let timeLeft = 25 * 60; // 25 minutes in seconds
    let timerInterval; // Declare timerInterval to use in the startTimer function
    startTimer(); // Start the timer when task is created

    // Append the delete and edit buttons to the task item
    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);

    // Add the task item to the task list
    document.getElementById('taskList').appendChild(taskItem);

    // Clear the input field after adding the task
    taskInput.value = '';


});