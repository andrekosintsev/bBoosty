let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.setText("Update Account");
tg.MainButton.show();

var datePickerInput = document.getElementById('nextDate');
[datePickerInput]
.forEach(item => {
    if (!item) {
        return;
    }
    item.addEventListener('input', function() {
        // Remove any non-digit characters
        const cleanedInput = this.value.replace(/\D/g, '');

        // Check if the input is not empty
        if (cleanedInput.length > 0) {
            // Extract day, month, and year parts
            let day = cleanedInput.slice(0, 2);
            let month = cleanedInput.slice(2, 4);
            let year = cleanedInput.slice(4, 8);
            // Validate day and month
            if (day > 31) day = '31';
            if (month > 12) month = '12';

            // Format the date as DD.MM.YYYY
            let formattedDate = day;
            if (month) formattedDate += '.' + month;
            if (year) formattedDate += '.' + year;
            this.value = formattedDate;
        }
    });
});

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
    document.getElementById('nextDate').value = entry.upcoming || "";
    document.getElementById('regularity').value = entry.regularity || "";
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
    if (enteredDate && /\d{2}.\d{2}.\d{4}/.test(enteredDate)) {
        const [day, month, year] = enteredDate.split('.');
        const formattedDate = `${year}-${month}-${day}`;
        var enteredDateObject = new Date(formattedDate);
        var currentDate = new Date();
        if (enteredDateObject > currentDate) {
            tg.sendData(JSON.stringify({
                settings: {
                             id: document.getElementById('id').value,
                             username: document.getElementById('username').value,
                             firstName: document.getElementById('firstName').value,
                             lastName: document.getElementById('lastName').value,
                             difficulty: document.getElementById('difficulty').value,
                             upcoming: enteredDate,
                             regularity: document.getElementById('regularity').value,
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
                                title: 'Please set next training date (Next day should be at least tomorrow)',
                                message: 'You have not provided your upcoming training date. This information is crucial for us to tailor a program that aligns with your schedule. Please specify the date when you plan to train next.',
                                buttons: [{
                                    id: 'ok',
                                    text: 'Ok'
                                }]
                            }, function(buttonId) {});
        }
    } else {
        tg.showPopup({
                    title: 'Please set next training date (Next day should be at least tomorrow)',
                    message: 'You have not provided your upcoming training date. This information is crucial for us to tailor a program that aligns with your schedule. Please specify the date when you plan to train next.',
                    buttons: [{
                        id: 'ok',
                        text: 'Ok'
                    }]
                }, function(buttonId) {});
    }
});