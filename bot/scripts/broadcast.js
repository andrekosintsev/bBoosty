let tg = window.Telegram.WebApp;
tg.expand();
tg.MainButton.setText("Send message");
tg.MainButton.show();

Telegram.WebApp.onEvent("mainButtonClicked", function () {
    tg.sendData(JSON.stringify({
                lang: document.getElementById('language').value,
                text: document.getElementById('message').value
            }));
            tg.close();
});