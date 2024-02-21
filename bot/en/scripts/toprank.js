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
        const tops = document.getElementById('tops');
        jsonObject.forEach(x => {
            tops.appendChild(populateFormForEditing(x));
        });
    }
});

function populateFormForEditing(entry) {
    const colDiv = document.createElement('div');
    colDiv.classList.add('col-lg-4');
    const linkProgram = 'https://t.me/TrainMateBot?start='+entry.id;
    const name = !entry.fullName ? 'Name not set' : entry.fullName;
    colDiv.innerHTML = `
            <div class="card card-small card-post mb-4">
                <div class="card-body d-flex">
                    <div class="card-post__author d-flex">
                        <div class="d-flex flex-column justify-content-center ml-3">
                            <span class="card-post__author-name">${name}</span>
                            <small class="text-muted">Program used by: ${entry.count} people</small>
                            <small class="text-muted">Body part: ${entry.bodyPart}</small>
                            <small class="text-muted">Muscle group: ${entry.muscle}</small>
                            <small class="text-muted">Equipment: ${entry.equipment}</small>
                            ${entry.promoted ? `<small style="color: #B8860B;">Promoted</small>` : ''}
                        </div>
                    </div>
                    <div class="my-auto ml-auto">
                        <a class="btn btn-sm btn-white" href=${linkProgram} onclick="tg.close()">
                            <i class="fa fa-play mr-1"></i></a>
                    </div>
                </div>
            </div>
        `;
    return colDiv;
}
