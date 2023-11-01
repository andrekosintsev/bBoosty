let tg = window.Telegram.WebApp;

tg.expand();
tg.MainButton.text = "Заменить похожим";
tg.MainButton.show();

const instruction = document.getElementById('instruction');
const equipment = document.getElementById('equipment');

function hideAnother(nameActive) {
    [instruction, equipment].forEach(item => {
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

[instruction, equipment].forEach(item => {
    item.addEventListener('click', function() {
        hideAnother(item);
    });
});

Telegram.WebApp.onEvent("mainButtonClicked", function() {
    if (selectedIds.length > 0) {
        if (selectedIds.length > 4) {
            tg.showPopup({
                title: 'Ошибка',
                message: 'Выбрано больше 4 категорий, уберите лишнее. Я не вижу смысла генерировать упражнения сразу для более, чем 4х групп мышц',
                buttons: [{
                    id: 'delete',
                    type: 'ok',
                    text: 'OK'
                }]
            });
        } else {
            tg.sendData(JSON.stringify({
                muscle_group: selectedIds
            }));
            tg.close();
        }
    } else {
        tg.showPopup({
            title: 'Выберите категорию',
            message: 'Вы не выбрали категорию мышц для тренировки',
            buttons: [{
                id: 'delete',
                type: 'ok',
                text: 'OK'
            }]
        });

    }
});