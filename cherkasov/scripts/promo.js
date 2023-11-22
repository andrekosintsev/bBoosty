let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.setText("Отправить промокод");
tg.MainButton.show();

Telegram.WebApp.onEvent("mainButtonClicked", function() {
    tg.sendData(JSON.stringify({
                     promo: document.getElementById('promoCode').value
    }));
    tg.close();
});