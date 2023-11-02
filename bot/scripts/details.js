let tg = window.Telegram.WebApp;

tg.expand();
tg.MainButton.text = "Сохранить сеты";
tg.MainButton.show();

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
    });
});

let rowCount = 1;
const maxRowCount = 11;

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
        rowCount++;
    } else {
        tg.showPopup({
            title: 'Максимальное количество сетов достигнуто',
            message: 'Мне кажется вы уработались на этом упражнении, переходите к другому упражнению!',
            buttons: [{
                id: 'ok',
                text: 'Okay'
            }]
        }, function(buttonId) {});
    }
});

document.getElementById('change').addEventListener('click', function() {
    let text = document.getElementById('neverRecommend').checked ? 'Замена упражнения в программе и удаление из рекомендации' : 'Замена упражнения в программе';
    tg.showPopup({
        title: text,
        message: 'Вы уверены что хотите заменить упражнение?',
        buttons: [{
            id: 'ok',
            text: 'Да'
        }, {
            id: 'cancel',
            text: 'Отмена'
        }]
    }, function(buttonId) {
        if ('ok' === buttonId) {
            tg.sendData(JSON.stringify({
                set_update: {
                    id: document.getElementById('id').value,
                    force: document.getElementById('neverRecommend').checked
                }
            }));
            tg.close();
        }
    });
});

document.getElementById('delete').addEventListener('click', function() {
    let text = document.getElementById('neverRecommend').checked ? 'Полное удаление и невозможность рекомендации' : 'Удаление из этой программы';
    tg.showPopup({
        title: text,
        message: 'Вы уверены что хотите удалить упражнение?',
        buttons: [{
            id: 'ok',
            text: 'Да'
        }, {
            id: 'cancel',
            text: 'Отмена'
        }]
    }, function(buttonId) {
        if ('ok' === buttonId) {
            tg.sendData(JSON.stringify({
                set_delete: {
                    id: document.getElementById('id').value,
                    force: document.getElementById('neverRecommend').checked
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