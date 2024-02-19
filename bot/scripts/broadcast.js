let tg = window.Telegram.WebApp;
tg.expand();
tg.MainButton.setText("Send message");
tg.MainButton.show();


const language = document.getElementById('language');
const message = document.getElementById('message');

// Event handler for the main button click
Telegram.WebApp.onEvent("mainButtonClicked", function () {
    const selectedLanguage = languageSelect.value;
    tg.sendData(JSON.stringify({
                lang: selectedLanguage,
                text: message.value
            }));
            tg.close();
});