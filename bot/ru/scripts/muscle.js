let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.text = "Добавить выбранные к программе";
tg.MainButton.show();

const muscleGrid = document.getElementById("muscles");
let mGroup;
let sEquipment;

function getQueryParam(name) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(name);
}

let selectedIds = [];

document.addEventListener("DOMContentLoaded", function() {
    const encodedJsonData = getQueryParam("json_data");
    if (encodedJsonData) {
        const jsonData = decodeURIComponent(encodedJsonData);
        const jsonObject = JSON.parse(jsonData);
        if (jsonObject.selected) {
            selectedIds = jsonObject.selected;
        }
        if (jsonObject.group) {
            mGroup = jsonObject.group;
        }
        if (jsonObject.equipment) {
            sEquipment = jsonObject.equipment;
        }
        muscleGrid.appendChild(createMuscleCard(jsonObject.active));
    }
});



function createMuscleCard(elements) {
    const muscleCard = document.createElement("div");
    muscleCard.classList.add("grid-container", "col-lg-4", "col-sm-12", "mb-2");
    elements.forEach((element) => {
        const gridItem = document.createElement("div");
        gridItem.classList.add("grid-item");

        gridItem.innerHTML = `
                                        <div class="card">
                                                <div class="card-post__image" style="background-image: url('https://d1uymmnq9lzoil.cloudfront.net/images/${element}.gif'); border-bottom-left-radius: 0.625rem; border-bottom-right-radius: 0.625rem;"></div>
                                        </div>`;
        const index = selectedIds.indexOf(element);
        if (index > -1) {
           gridItem.classList.add("selected");
        }
        muscleCard.appendChild(gridItem);
        gridItem.addEventListener("click", function() {
            if (gridItem.classList.contains("selected")) {
                gridItem.classList.remove("selected");
                const index = selectedIds.indexOf(element);
                if (index > -1) {
                    selectedIds.splice(index, 1);
                }
            } else {
                gridItem.classList.add("selected");
                selectedIds.push(element);
            }
        });
    });
    return muscleCard;

}

function generateRatingStars(rating) {
    if (!rating) {
        const emptyStar = '☆';
        return emptyStar.repeat(5);
    }

    const fullStarCount = Math.floor(rating);
    const halfStarCount = rating % 1 > 0 ? 1 : 0;

    const fullStar = '★';
    const halfStar = '☆';

    return (fullStar.repeat(fullStarCount) +
        halfStar.repeat(halfStarCount));
}

Telegram.WebApp.onEvent("mainButtonClicked", function() {
    if (selectedIds.length > 0) {
        if (selectedIds.length >= 9) {
            tg.showPopup({
                title: 'Ошибка',
                message: 'Вы выбрали более 8 упражнений. Пожалуйста, уменьшите ваш выбор до 8 упражнений или менее. Я создаю программу, которая сосредотачивается на максимуме 8 упражнений, поскольку не вижу смысла в эффективности тренировки превышающей 8 упражнений!',
                buttons: [{
                    id: 'delete',
                    type: 'ok',
                    text: 'OK'
                }]
            });
        } else {
            tg.sendData(JSON.stringify({
                exercises: selectedIds,
                group: mGroup,
                equipment: sEquipment
            }));
            tg.close();
        }
    } else {
        tg.showPopup({
            title: 'Выберите, как минимум одно упражнение',
            message: 'Вы не выбрали упражнения для вашей тренировки. Чтобы вернуться, нажмите "Отмена" в верхнем левом углу, или добавьте упражнения, которые вы забыли включить по какой-либо причине.',
            buttons: [{
                id: 'delete',
                type: 'ok',
                text: 'OK'
            }]
        });
    }
});