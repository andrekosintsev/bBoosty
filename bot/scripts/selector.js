// Initialize the Telegram WebApp
let tg = window.Telegram.WebApp;

// Expand the Telegram WebApp
tg.expand();

// Set the main button text and make it visible
tg.MainButton.text = "Select Program";


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

                // Change color on mouseover
                muscleElement.addEventListener('mouseover', function () {
                    const pathElement = muscleElement.querySelector('path');
                    if (pathElement.classList) {
                      pathElement.classList.add("hover");
                    } else {
                      pathElement.className += ' ' + "hover";
                    }
                    document.getElementById("select").textContent = muscleId;
                });

                // Restore original color on mouseout
                muscleElement.addEventListener('mouseout', function () {
                    muscleElement.style.fill = ''; // Restore original color
                    const pathElement = muscleElement.querySelector('path');
                    if (pathElement.classList) {
                        pathElement.classList.remove("hover");
                    }
                    document.getElementById("select").textContent = 'Choose a Muscle';
                });
                muscleElement.addEventListener('click', function () {
                    const pathElement = muscleElement.querySelector('path');
                    if (pathElement.classList) {
                        pathElement.classList.add("hover");
                    } else {
                        pathElement.className += ' ' + "hover";
                    }
                    document.getElementById("select").textContent = muscleId;
                    tg.MainButton.show();
                });
            });
        });


// Event handler for the main button click
Telegram.WebApp.onEvent("mainButtonClicked", function() {
    const pageTitleText = document.getElementById("select").textContent;
    if (pageTitleText==="Choose a Muscle") {
            // Display a message to choose a category if none is selected
                    tg.showPopup({
                        title: 'Choose a Category',
                        message: 'You have not selected a muscle category for your workout.',
                        buttons: [{
                            id: 'delete',
                            type: 'ok',
                            text: 'OK'
                        }]
                    });
    } else {
        // Send the selected muscle categories to the Telegram WebApp and close the app
                    tg.sendData(JSON.stringify({
                        muscle_group: pageTitleText
                    }));
                    tg.close();
    }
});