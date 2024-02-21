let tg = window.Telegram.WebApp;

tg.expand();
tg.MainButton.hide();

function getQueryParam(name) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(name);
}

document.addEventListener("DOMContentLoaded", function () {
    const encodedJsonData = getQueryParam("json_data");

    if (encodedJsonData) {
        const jsonData = decodeURIComponent(encodedJsonData);
        const jsonObject = JSON.parse(jsonData);
        populateFormForEditing(jsonObject);
    }
    const tops = document.getElementById('tops');
    [{'id':'49e22002-0ebe-430c-acd0-e83923625de6',
    'fullName':'Andros Papandros',
    'count': 123,
    'muscle': 'triceps, pectoral'},{'id':'49e22002-0ebe-430c-acd0-e83923625de6', 'count': 15,'muscle': 'shoulders, triceps, forearms, chest'}].forEach(x => {
        tops.appendChild(populateFormForEditing(x));
    });
});

function populateFormForEditing(entry) {
    const colDiv = document.createElement('div');
    colDiv.classList.add('col-lg-4');
    const linkProgram = 'https://t.me/BBoostyBot?start='+entry.id;
    const name = !entry.fullName ? 'Имя не установлено' : entry.fullName;
    colDiv.innerHTML = `
            <div class="card card-small card-post mb-4">
                <div class="card-body d-flex">
                    <div class="card-post__author d-flex">
                        <a href="#" class="card-post__author-avatar card-post__author-avatar--small" style="background-image: url('images/logo.png');">Written by James Khan</a>
                        <div class="d-flex flex-column justify-content-center ml-3">
                            <span class="card-post__author-name">Автор: ${name}</span>
                            <small class="text-muted">Получили программу: <br>${entry.count} человек</small>
                            <small class="text-muted"> ${entry.muscle}</small>
                        </div>
                    </div>
                    <div class="my-auto ml-auto">
                        <a class="btn btn-sm btn-white" href=${linkProgram}>
                            <i class="far fa-bookmark mr-1"></i>Получить</a>
                    </div>
                </div>
            </div>
        `;
        return colDiv;

}