// Initialize the Telegram WebApp
let tg = window.Telegram.WebApp;

// Expand the Telegram WebApp
tg.expand();

// Set the main button text and make it visible
tg.MainButton.text = "Select Program";


document.addEventListener('DOMContentLoaded', function() {

    ['Trapezius', 'Lats', 'Triceps', 'Forearms'].forEach(function(muscleId) {
        const muscleElement = document.getElementById(muscleId);
        muscleElement.querySelectorAll('path').forEach(function(element) {
            element.style = "fill: #FF7676 !important;";
        });
    });
    ['Glutes', 'Hamstrings', 'Calves', 'Deltoids'].forEach(function(muscleId) {
        const muscleElement = document.getElementById(muscleId);
        muscleElement.querySelectorAll('path').forEach(function(element) {
            element.style = "fill: #FF5757 !important;";
        });
    });
    ['Biceps', 'Pectorals', 'Abs'].forEach(function(muscleId) {
        const muscleElement = document.getElementById(muscleId);
        muscleElement.querySelectorAll('path').forEach(function(element) {
            element.style = "fill: #C74A4A !important";
        });
    });
    ['Quads', 'Adductors', 'Levator Scapulae', 'Abductors'].forEach(function(muscleId) {
        const muscleElement = document.getElementById(muscleId);
        muscleElement.querySelectorAll('path').forEach(function(element) {
            element.style = "fill: #9C0000 !important";
        });
    });
    ['Spine', 'Serratus Anterior', 'Upper back'].forEach(function(muscleId) {
        const muscleElement = document.getElementById(muscleId);
        muscleElement.querySelectorAll('path').forEach(function(element) {
            element.style = "fill: #BDBDBD !important";
        });
    });
});


// Event handler for the main button click
Telegram.WebApp.onEvent("mainButtonClicked", function() {
    const pageTitleText = document.getElementById("select").textContent;
    if (pageTitleText === "Choose a Muscle") {
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