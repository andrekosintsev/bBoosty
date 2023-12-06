let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.text = "Add selected to program";
tg.MainButton.show();

const muscleGrid = document.getElementById("muscles");
let mGroup;

function getQueryParam(name) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(name);
}

let selectedIds = [];

document.addEventListener("DOMContentLoaded", function() {
    const encodedJsonData = getQueryParam("json_data");
    if (encodedJsonData) {
        const jsonData = decodeURIComponent(encodedJsonData);
        const jsonArray = JSON.parse(jsonData);
        if (jsonArray.selected) {
            selectedIds = jsonArray.selected;
        }
        if (jsonArray.group) {
            mGroup = jsonArray.group;
        }
        muscleGrid.appendChild(createMuscleCard(jsonArray.active));
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
                                                <div class="card-post__image" style="background-image: url('https://bodyboots.surge.sh/${element}.gif'); border-bottom-left-radius: 0.625rem; border-bottom-right-radius: 0.625rem;"></div>
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
        if (selectedIds.length >= 6) {
            tg.showPopup({
                title: 'Error',
                message: 'You have chosen more than 5 exercises. Please trim your selection to 5 exercises or fewer. I am crafting a program that focuses on a maximum of 5 exercises, as exceeding this limit may not yield additional benefits.',
                buttons: [{
                    id: 'delete',
                    type: 'ok',
                    text: 'OK'
                }]
            });
        } else {
            tg.sendData(JSON.stringify({
                exercises: selectedIds,
                group: mGroup
            }));
            tg.close();
        }
    } else {
        tg.showPopup({
            title: 'Choose a Category',
            message: 'You have not selected a exercises to do for your workout.',
            buttons: [{
                id: 'delete',
                type: 'ok',
                text: 'OK'
            }]
        });
    }
});