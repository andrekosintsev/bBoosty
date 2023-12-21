let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.setText("Сохранить");
tg.MainButton.show();

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

// Функция для заполнения формы данными для редактирования
function populateFormForEditing(entry) {
    document.getElementById('id').value = entry.id || "";
    document.getElementById('username').value = entry.username || "";
    document.getElementById('firstName').value = entry.firstName || "";
    document.getElementById('lastName').value = entry.lastName || "";
    document.getElementById('languageCode').value = entry.languageCode || "";
    document.getElementById('difficulty').value = entry.difficulty || "";
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

Telegram.WebApp.onEvent("mainButtonClicked", function () {
            tg.sendData(JSON.stringify({
                settings: {
                    id: document.getElementById('id').value,
                    username: document.getElementById('username').value,
                    firstName: document.getElementById('firstName').value,
                    lastName: document.getElementById('lastName').value,
                    languageCode: document.getElementById('languageCode').value,
                    difficulty: document.getElementById('difficulty').value,
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
    }
});
