let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.setText("Connect");
tg.MainButton.show();

Telegram.WebApp.onEvent("mainButtonClicked", function() {
    tg.sendData(JSON.stringify({
        connection: {
                     id: document.getElementById('connect').value
        }
    }));
    tg.close();
});