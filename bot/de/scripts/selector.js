// Initialize the Telegram WebApp
let tg = window.Telegram.WebApp;

// Expand the Telegram WebApp
tg.expand();

// Set the main button text and make it visible
tg.MainButton.text = "Entdecken Sie Übungen";
let selectedMuscleGroups = [];
const equipmentSelect = document.getElementById("equipment");

function getQueryParam(name) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(name);
}

function populateFormForEditing(equipmentList) {
fetch('scripts/equipment.json')
  .then(response => response.json())
  .then(data => {
    let allEquipments = data;
     equipmentSelect.innerHTML = "";
            // Populate the select element with options from the list
            equipmentList.forEach(equipment => {
                const option = document.createElement("option");
                option.value = equipment;
                option.text = allEquipments[equipment];
                equipmentSelect.appendChild(option);
            });
  })
  .catch(error => console.error('Error loading JSON:', error));

}

document.addEventListener('DOMContentLoaded', function () {
    const encodedJsonData = getQueryParam("json_data");
    if (encodedJsonData) {
       const jsonData = decodeURIComponent(encodedJsonData);
       const jsonObject = JSON.parse(jsonData);
       populateFormForEditing(jsonObject);
    }
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
                // Check if the maximum limit of 7 selections is reached
                if (selectedMuscleGroups.length < 7) {
                    // Select the muscle group
                    selectedMuscleGroups.push(muscleId);
                    allPath.forEach(function (pathElement) {
                        pathElement.style= "fill: black !important;opacity: .5; cursor: pointer;";
                    });
                } else {
                    // Display a message if the maximum limit is reached
                    tg.showPopup({
                        title: 'Maximale Auswahl erreicht.',
                        message: 'Sie können nur bis zu 7 Muskelgruppen auswählen.',
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


function getSelectedEquipment() {
    const equipmentSelect = document.getElementById("equipment");
    const selectedEquipment = [];

    // Loop through each option in the select element
    for (let i = 0; i < equipmentSelect.options.length; i++) {
        const option = equipmentSelect.options[i];

        // Check if the option is selected
        if (option.selected) {
            selectedEquipment.push(option.value);
        }
    }

    return selectedEquipment;
}

// Event handler for the main button click
Telegram.WebApp.onEvent("mainButtonClicked", function () {
    const selectedEquipment = getSelectedEquipment(); // Assuming you have a function to get selected equipment

    if (selectedMuscleGroups.length === 0) {
        tg.showPopup({
            title: 'Choose a Category',
            message: 'Du hast keine Muskelkategorien für dein Training ausgewählt.',
            buttons: [{
                id: 'ok',
                type: 'ok',
                text: 'OK'
            }]
        });
    } else if (selectedMuscleGroups.length > 7) {
        tg.showPopup({
            title: 'Maximale Auswahl erreicht.',
            message: 'Sie können nur bis zu 7 Muskelgruppen auswählen.',
            buttons: [{
                id: 'ok',
                type: 'ok',
                text: 'OK'
            }]
        });
    } else if (selectedEquipment.length === 0) {
        // Check if no equipment is selected
        tg.showPopup({
            title: 'Gerät auswählen',
            message: 'Bitte wählen Sie mindestens ein Trainingsgerät für Ihr Workout aus. Wenn diese Liste leer ist, können Sie Elemente im ⚙️Einstellungen-Menü hinzufügen.',
            buttons: [{
                id: 'ok',
                type: 'ok',
                text: 'OK'
            }]
        });
    } else if (selectedEquipment.length > 6) {
        // Check if more than 6 equipment items are selected
        tg.showPopup({
            title: 'Maximale Geräteauswahl erreicht.',
            message: 'Sie können nur bis zu 6 Ausrüstungsgegenstände auswählen.',
            buttons: [{
                id: 'ok',
                type: 'ok',
                text: 'OK'
            }]
        });
    } else {
        // Send the selected muscle categories and equipment to the Telegram WebApp and close the app
        tg.sendData(JSON.stringify({
            muscle_group: selectedMuscleGroups,
            equipment: selectedEquipment
        }));
        tg.close();
    }
});


