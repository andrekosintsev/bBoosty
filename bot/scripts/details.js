let tg = window.Telegram.WebApp;

tg.expand();
tg.MainButton.text = "Save Sets";
tg.MainButton.show();

let rowCount = 1;
const maxRowCount = 7;

function getQueryParam(name) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(name);
}

document.addEventListener("DOMContentLoaded", function() {
    const encodedJsonData = getQueryParam("json_data");

    if (encodedJsonData) {
        const jsonData = decodeURIComponent(encodedJsonData);
        const jsonObject = JSON.parse(jsonData);
        populateFormForEditing(jsonObject);
    }
});

function populateFormForEditing(entry) {

    if (entry.trainingSet) {
        document.getElementById("id").value = entry.trainingSet.id || '';
    }
    if (entry.exercise) {
        document.getElementById("exId").value = entry.exercise.id || '';
        document.getElementById("muscle").value = entry.exercise.muscle || '';
        if (entry.exercise.instructions) {
            document.getElementById("instructions").textContent = entry.exercise.instructions;
        }

        if (entry.exercise.difficulty) {
            switch (entry.exercise.difficulty) {
                case 'beginner':
                    document.getElementById("difficulty").classList.add("badge-info");
                    document.getElementById("difficulty").textContent = "beginner";
                    break;
                case 'intermediate':
                    document.getElementById("difficulty").classList.add("badge-warning");
                    document.getElementById("difficulty").textContent = "intermediate";
                    break;
                case 'expert':
                    document.getElementById("difficulty").classList.add("badge-danger");
                    document.getElementById("difficulty").textContent = "expert";
                    break;
                default:
                    document.getElementById("difficulty").classList.add("badge-info");
                    document.getElementById("difficulty").textContent = "beginner";
                    break;
            }
        }
        if (entry.exercise.name) {
            document.getElementById("enName").textContent = entry.exercise.name;
        }
        if (entry.exercise.ruName) {
            document.getElementById("ruName").textContent = entry.exercise.ruName;
        }
        if (entry.exercise.video) {
            document.getElementById("video").src = entry.exercise.video;
            document.getElementById("video").style.display = 'block';
            document.getElementById("video").style.width = '100%';
        } else {
            document.getElementById("noContent").src = "images/not_available.gif";
            document.getElementById("noContent").style.display = 'block';
            document.getElementById("noContent").style.width = '100%';
        }
        if (entry.exercise.gifUrl) {
            document.getElementById("gifImage").src = entry.exercise.gifUrl;
        } else {
            document.getElementById("gifImage").src = "images/not_available.gif";
             document.getElementById("gifImage").style.width = "-webkit-fill-available";
              document.getElementById("gifImage").style.height = "-webkit-fill-available";
        }
        document.getElementById("gif").style.display = 'block';

        if (entry.trainingSet.data) {
            const setList = document.getElementById('sets');

            entry.trainingSet.data.forEach(x => {
                item = JSON.parse(x);
                const newRow = setList.insertRow(item.set - 1);
                const cell1 = newRow.insertCell(0);
                const cell2 = newRow.insertCell(1);
                const cell3 = newRow.insertCell(2);
                const cell4 = newRow.insertCell(3);

                cell1.innerHTML = `<div class="form-group mt-2">${item.set}</div>`;
                cell2.innerHTML = `<div class="form-group"><input type="number" class="form-control" placeholder="10" value="${item.repeat}"></div>`;
                cell3.innerHTML = `<div class="form-group"><input type="number" class="form-control" placeholder="100" value="${item.weight}"></div>`;
                cell4.innerHTML = `<i class="btn-sm btn-danger material-icons pb-1 pt-1" style="font-size: large; position: static;">delete_forever</i>`;
                cell4.querySelector('i').addEventListener('click', function() {
                    const row = this.parentElement.parentElement;
                    const index = Array.from(row.parentElement.rows).indexOf(row);
                    row.remove();
                    rowCount--;
                    for (let i = index; i < setList.rows.length; i++) {
                        setList.rows[i].cells[0].innerHTML = `<div class="form-group mt-2">${i + 1}</div>`;
                    }
                    collectedData.splice(index, 1);
                });
                const repeatInput = cell2.querySelector('input');
                repeatInput.addEventListener('input', function() {
                    if (this.value < 0) {
                        this.value = 0;
                    } else if (this.value > 50) {
                        this.value = 50;
                    }
                });
                const weightInput = cell3.querySelector('input');
                weightInput.addEventListener('input', function() {
                    if (this.value < 0) {
                        this.value = 0;
                    } else if (this.value > 530) {
                        this.value = 530;
                    }
                });
                rowCount++;
            });
        }
    }
}

const instruction = document.getElementById('instruction');
const set = document.getElementById('set');

const collectedData = [];

function hideAnother(nameActive) {
    [instruction, set].forEach(item => {
        if (nameActive === item) {
            document.getElementById(item.id + 'Options').style.display = 'block';
            item.classList.add("btn-primary");
            item.classList.remove("btn-white");
        } else {
            document.getElementById(item.id + 'Options').style.display = 'none';
            item.classList.add("btn-white");
            item.classList.remove("btn-primary");
        }
    });
}

[instruction, set].forEach(item => {
    item.addEventListener('click', function() {
        hideAnother(item);
        if(item === instruction) {
           document.getElementById("videoContent").style.display = 'block';
           document.getElementById("gif").style.display = 'none';
        } else {
           document.getElementById("videoContent").style.display = 'none';
           document.getElementById("gif").style.display = 'block';
        }
    });
});

document.getElementById('addRow').addEventListener('click', function() {
    if (rowCount < maxRowCount) {
        const setList = document.getElementById('sets');
        const newRow = setList.insertRow(rowCount - 1);

        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);

        cell1.innerHTML = `<div class="form-group mt-2">${rowCount}</div>`;
        cell2.innerHTML = '<div class="form-group"><input type="number" class="form-control" placeholder="10"> </div>';
        cell3.innerHTML = '<div class="form-group"><input type="number" class="form-control" placeholder="100"> </div>';
        cell4.innerHTML = '<i class="btn-sm btn-danger material-icons pb-1 pt-1" style="font-size: large; position: static;">delete_forever</i>';
        cell4.querySelector('i').addEventListener('click', function() {
            const row = this.parentElement.parentElement;
            const index = Array.from(row.parentElement.rows).indexOf(row);
            row.remove();
            rowCount--;
            for (let i = index; i < setList.rows.length; i++) {
                setList.rows[i].cells[0].innerHTML = `<div class="form-group mt-2">${i + 1}</div>`;
            }
            collectedData.splice(index, 1);
        });
        const repeatInput = cell2.querySelector('input');
        repeatInput.addEventListener('input', function() {
            if (this.value < 0) {
                this.value = 0;
            } else if (this.value > 50) {
                this.value = 50;
            }
        });
        const weightInput = cell3.querySelector('input');
        weightInput.addEventListener('input', function() {
            if (this.value < 0) {
                this.value = 0;
            } else if (this.value > 530) {
                this.value = 530;
            }
        });
        rowCount++;
    } else {
        tg.showPopup({
            title: 'Maximum number of sets reached',
            message: 'It seems you have exhausted this exercise. Move on to another exercise!',
            buttons: [{
                id: 'ok',
                text: 'Okay'
            }]
        }, function(buttonId) {});
    }
});

document.getElementById('change').addEventListener('click', function() {
    let text = document.getElementById('neverRecommend').checked ? 'Replace exercise in program and remove from recommendations' : 'Replace exercise in program';
    tg.showPopup({
        title: text,
        message: 'Are you sure you want to replace the exercise?',
        buttons: [{
            id: 'ok',
            text: 'Yes'
        }, {
            id: 'cancel',
            text: 'Cancel'
        }]
    }, function(buttonId) {
        if ('ok' === buttonId) {
            tg.sendData(JSON.stringify({
                set_replace: {
                    id: document.getElementById('id').value,
                    exId: document.getElementById('exId').value,
                    force: document.getElementById('neverRecommend').checked,
                    muscle: document.getElementById("muscle").value
                }
            }));
            tg.close();
        }
    });
});

document.getElementById('delete').addEventListener('click', function() {
    let text = document.getElementById('neverRecommend').checked ? 'Complete removal and inability to recommend' : 'Removal from this program';
    tg.showPopup({
        title: text,
        message: 'Are you sure you want to delete the exercise?',
        buttons: [{
            id: 'ok',
            text: 'Yes'
        }, {
            id: 'cancel',
            text: 'Cancel'
        }]
    }, function(buttonId) {
        if ('ok' === buttonId) {
            tg.sendData(JSON.stringify({
                set_delete: {
                    id: document.getElementById('id').value,
                    exId: document.getElementById('exId').value,
                    force: document.getElementById('neverRecommend').checked,
                    muscle: document.getElementById("muscle").value
                }
            }));
            tg.close();
        }
    });
});


Telegram.WebApp.onEvent("mainButtonClicked", function() {
    collectedData.length = 0;
    const setList = document.getElementById('sets');
    for (let i = 0; i < setList.rows.length; i++) {
        const row = setList.rows[i];
        const rowData = {
            set: i + 1,
            repeat: row.cells[1].querySelector('input').value,
            weight: row.cells[2].querySelector('input').value
        };
        collectedData.push(rowData);
    }
    if (collectedData.length > 0) {
        tg.sendData(JSON.stringify({
            set_update: {
                id: document.getElementById('id').value,
                sets: collectedData
            }
        }));
    }
    tg.close();
});
