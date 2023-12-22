// Initialize the Telegram WebApp
let tg = window.Telegram.WebApp;

// Expand the Telegram WebApp
tg.expand();

// Set the main button text and make it visible
tg.MainButton.text = "Select Program";
let selectedMuscleGroups = [];

document.addEventListener('DOMContentLoaded', function () {
    // Get all muscle group IDs
    const muscleGroupIds = [
        'Trapezius', 'Lats', 'Triceps', 'Forearms',
        'Glutes', 'Hamstrings', 'Calves', 'Deltoids',
        'Biceps', 'Pectorals', 'Abs',
        'Quads', 'Adductors','Levator Scapulae','Abductors','Spine', 'Serratus Anterior', 'Upper back'
    ];

    // Add mouseover event listener to each muscle group
    muscleGroupIds.forEach(function (muscleId) {
        const muscleElement = document.getElementById(muscleId);

        muscleElement.addEventListener('mouseover', function () {
            const pathElement = muscleElement.querySelector('path');
            if (!pathElement.classList.contains("hover")) {
                if (pathElement.classList) {
                    pathElement.classList.add("hover");
                } else {
                    pathElement.className += ' ' + "hover";
                }
            }
        });

        muscleElement.addEventListener('mouseout', function () {
            const pathElement = muscleElement.querySelector('path');
            if (!pathElement.classList.contains("hover")) {
                if (pathElement.classList) {
                    pathElement.classList.remove("hover");
                }
            }
        });

        muscleElement.addEventListener('click', function () {
            const pathElement = muscleElement.querySelector('path');
            const allPath = muscleElement.querySelectorAll('path');

            // Check if the muscle group is already selected
            if (selectedMuscleGroups.includes(muscleId)) {
                // Deselect the muscle group
                selectedMuscleGroups = selectedMuscleGroups.filter(group => group !== muscleId);
                allPath.forEach(function (pathElement) {
                    pathElement.style= "fill: #333;";
                });
            } else {
                // Check if the maximum limit of 5 selections is reached
                if (selectedMuscleGroups.length < 5) {
                    // Select the muscle group
                    selectedMuscleGroups.push(muscleId);
                    allPath.forEach(function (pathElement) {
                        pathElement.style= "fill: black !important;opacity: .5; cursor: pointer;";
                    });
                } else {
                    // Display a message if the maximum limit is reached
                    tg.showPopup({
                        title: 'Maximum Selection Reached',
                        message: 'You can only select up to 5 muscle groups.',
                        buttons: [{
                            id: 'ok',
                            type: 'ok',
                            text: 'OK'
                        }]
                    });
                }
            }
            tg.MainButton.show();
        });
    });
});

// Event handler for the main button click
Telegram.WebApp.onEvent("mainButtonClicked", function() {
    // Check if no muscle groups are selected
    if (selectedMuscleGroups.length === 0) {
        tg.showPopup({
            title: 'Choose a Category',
            message: 'You have not selected any muscle categories for your workout.',
            buttons: [{
                id: 'ok',
                type: 'ok',
                text: 'OK'
            }]
        });
    } else if (selectedMuscleGroups.length > 4) {
        // Display a message if more than 4 muscle groups are selected
        tg.showPopup({
            title: 'Maximum Selection Reached',
            message: 'You can only select up to 5 muscle groups.',
            buttons: [{
                id: 'ok',
                type: 'ok',
                text: 'OK'
            }]
        });
    } else {
        // Send the selected muscle categories to the Telegram WebApp and close the app
        tg.sendData(JSON.stringify({
            muscle_group: selectedMuscleGroups
        }));
        tg.close();
    }
});
