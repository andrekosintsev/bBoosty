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
        cell4.innerHTML = '<i class="b-2 btn-sm btn-danger mr-1 material-icons large">delete_forever</i>';
        cell4.querySelector('i').addEventListener('click', function() {
            const row = this.parentElement.parentElement; // Get the row containing the delete icon
            const index = Array.from(row.parentElement.rows).indexOf(row);
            row.remove(); // Remove the row from the table
            rowCount--; // Decrement the row count
            // Update the row numbers for the remaining rows
            for (let i = index; i < setList.rows.length; i++) {
                setList.rows[i].cells[0].innerHTML = `<div class="form-group mt-2">${i + 1}</div>`;
            }
            // Remove the corresponding data from the collectedData array
            collectedData.splice(index, 1);
        });
        rowCount++; // Increment the row count
    } else {
        tg.showPopup({
            title: 'Максимальное количество',
            message: 'Мне кажется вы уработались на этом упражнении',
            buttons: [{
                id: 'ok',
                text: 'Okay'
            }]
        }, function(buttonId) {});
    }
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
                  exercise : {
                            id: document.getElementById('id').value,
                            sets: collectedData
                        }
         }));
    }
    tg.close();
});