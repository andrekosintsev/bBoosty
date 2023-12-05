let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.setText("Update Account");
tg.MainButton.show();

// Get the input element by ID
var datePickerInput = document.getElementById('datepicker');
var tomorrowDate = new Date();
tomorrowDate.setDate((new Date()).getDate() + 1);
var tomorrowFormatted = tomorrowDate.toISOString().split('T')[0];
datePickerInput.setAttribute('min', tomorrowFormatted);

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
    var datePickerInput = document.getElementById('datepicker');
    var enteredDate = datePickerInput.value;
    if (!enteredDate || !/\d{2}.\d{2}.\d{4}/.test(enteredDate)) {
        tg.showPopup({
                title: 'Please set next training date',
                message: 'You have not provided your upcoming training date. This information is crucial for us to tailor a program that aligns with your schedule. Please specify the date when you plan to train next.',
                buttons: [{
                    id: 'ok',
                    text: 'Yes'
                }]
            }, function(buttonId) {
                return;
            });
    }

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
});