let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.setText("Update Account");
tg.MainButton.show();

var datePickerInput = document.getElementById('datepicker');
var tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

    // Format the date as YYYY-MM-DD (required by the date input)
var tomorrowDate = tomorrow.toISOString().split('T')[0];

    // Set the min attribute to tomorrow's date
datePickerInput.min = tomorrowDate;

function getQueryParam(name) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(name);
}

const encodedJsonData = getQueryParam("json_data");

if (encodedJsonData) {
    const jsonData = decodeURIComponent(encodedJsonData);
    const fixedJson = jsonData.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":');
    const jsonObject = JSON.parse(fixedJson);
    populateFormForEditing(jsonObject);
}

// Function to populate the award form with data for editing
function populateFormForEditing(entry) {
    document.getElementById('id').value = entry.id || "";
    document.getElementById('username').value = entry.username || "";
    document.getElementById('firstName').value = entry.firstName || "";
    document.getElementById('lastName').value = entry.lastName || "";
    document.getElementById('difficulty').value = entry.difficulty || "";
    document.getElementById('datepicker').value = entry.upcoming || "";
    populateList(entry.equipments, 'equipments');
    populateList(entry.types, 'types');
}

function populateList(arrayElement, fieldName) {
    const selectElement = document.getElementById(fieldName);
    if (Array.isArray(arrayElement)) {
        for (const option of selectElement.options) {
            if (arrayElement.includes(option.value)) {
                option.selected = true;
            }
        }
    }
}

Telegram.WebApp.onEvent("mainButtonClicked", function() {
    var enteredDate = datePickerInput.value;
    if (enteredDate) {
        tg.sendData(JSON.stringify({
            settings: {
                         id: document.getElementById('id').value,
                         username: document.getElementById('username').value,
                         firstName: document.getElementById('firstName').value,
                         lastName: document.getElementById('lastName').value,
                         difficulty: document.getElementById('difficulty').value,
                         upcoming: enteredDate,
                         equipments: Array.from(document.getElementById('equipments').selectedOptions).map(function(option) {
                                     return option.value;
                                 }),
                         types: Array.from(document.getElementById('types').selectedOptions).map(function(option) {
                                     return option.value;
                                 }),
            }
        }));
        tg.close();
    } else {
        tg.showPopup({
                    title: 'Please set next training date',
                    message: 'You have not provided your upcoming training date. This information is crucial for us to tailor a program that aligns with your schedule. Please specify the date when you plan to train next.',
                    buttons: [{
                        id: 'ok',
                        text: 'Ok'
                    }]
                }, function(buttonId) {});
    }
});