let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.setText("Konto aktualisieren");
tg.MainButton.show();

var datePickerInput = document.getElementById('nextDate');
[datePickerInput]
.forEach(item => {
    if (!item) {
        return;
    }
    item.addEventListener('input', function() {
        // Entferne alle nicht-numerischen Zeichen
        const cleanedInput = this.value.replace(/\D/g, '');

        // Überprüfe, ob die Eingabe nicht leer ist
        if (cleanedInput.length > 0) {
            // Extrahiere Tag, Monat und Jahr
            let day = cleanedInput.slice(0, 2);
            let month = cleanedInput.slice(2, 4);
            let year = cleanedInput.slice(4, 8);
            // Überprüfe Tag und Monat
            if (day > 31) day = '31';
            if (month > 12) month = '12';

            // Formatieren des Datums als TT.MM.JJJJ
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

// Funktion zum Ausfüllen des Formulars mit Daten für die Bearbeitung
function populateFormForEditing(entry) {
    document.getElementById('id').value = entry.id || "";
    document.getElementById('username').value = entry.username || "";
    document.getElementById('firstName').value = entry.firstName || "";
    document.getElementById('lastName').value = entry.lastName || "";
    document.getElementById('languageCode').value = entry.languageCode || "";
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
     tg.sendData(JSON.stringify({
                    settings: {
                        id: document.getElementById('id').value,
                        username: document.getElementById('username').value,
                        firstName: document.getElementById('firstName').value,
                        lastName: document.getElementById('lastName').value,
                        languageCode: document.getElementById('languageCode').value,
                        difficulty: document.getElementById('difficulty').value,
                        upcoming: enteredDate,
                        regularity: document.getElementById('regularity').value,
                        equipments: Array.from(document.getElementById('equipments').selectedOptions).map(function (option) {
                            return option.value;
                        }),
                        types: Array.from(document.getElementById('types').selectedOptions).map(function (option) {
                            return option.value;
                        }),
                    }
                }));
                tg.close();
});
