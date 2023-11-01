let tg = window.Telegram.WebApp;

tg.expand();
tg.MainButton.text = "Подобрать программу";
tg.MainButton.show();

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