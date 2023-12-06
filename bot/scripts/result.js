let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.text = "Save and Send";
tg.MainButton.show();

const muscleGrid = document.getElementById("muscles");
let mGroup;

function getQueryParam(name) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(name);
}

let selectedIds = [];

document.addEventListener("DOMContentLoaded", function () {
    const encodedJsonData = getQueryParam("json_data");
    if (encodedJsonData) {
        const jsonData = decodeURIComponent(encodedJsonData);
        const jsonArray = JSON.parse(jsonData);
        muscleGrid.appendChild(createMuscleCard(jsonArray.selected));
        if(!jsonArray.selected) {
            tg.MainButton.hide();
            const muscleCard = document.createElement("div");
            muscleCard.innerHTML=`<div class="card" > No exercises selected  </div>`;
            muscleGrid.appendChild(muscleCard);
        }
        makeGridItemsDraggable();
    } else {
                tg.MainButton.hide();
                const muscleCard = document.createElement("div");
                muscleCard.innerHTML=`No exercises selected`;
                muscleGrid.appendChild(muscleCard);
     }
});

function makeGridItemsDraggable() {
    const gridItems = document.querySelectorAll(".grid-item");

    gridItems.forEach((item) => {
        let draggedIndex;

        item.addEventListener("touchstart", function (event) {
            draggedIndex = parseInt(item.dataset.index);
        });

        item.addEventListener("touchmove", function (event) {
            event.preventDefault();
        });

        item.addEventListener("touchend", function (event) {
            const currentIndex = parseInt(item.dataset.index);
            const gridItems = document.querySelectorAll(".grid-item");

            gridItems.forEach((gridItem) => {
                gridItem.style.borderTop = "";
                gridItem.style.borderBottom = "";
            });

            if (draggedIndex < currentIndex) {
                item.parentNode.insertBefore(document.querySelector(`[data-index="${draggedIndex}"]`), item);
            } else if (draggedIndex > currentIndex) {
                item.parentNode.insertBefore(document.querySelector(`[data-index="${draggedIndex}"]`), item.nextSibling);
            }

            updateOrderIndexes();
        });
    });
}

function createMuscleCard(elements) {
    const muscleCard = document.createElement("div");
    muscleCard.classList.add("grid-container", "col-lg-4", "col-sm-12", "mb-2");

    let orderIndex = 1;

    elements.forEach((element) => {
        const gridItem = document.createElement("div");
        gridItem.classList.add("grid-item");
        gridItem.dataset.index = orderIndex;
        gridItem.innerHTML = `
            <div class="card" draggable="true">
                <div class="card-post__image" style="background-image: url('https://bodyboots.surge.sh/${element}.gif'); position: relative; border-bottom-left-radius: 0.625rem; border-bottom-right-radius: 0.625rem;">
                </div>
            </div>`;

        if (elements.includes(element)) {
            orderIndex++;
        }

        muscleCard.appendChild(gridItem);
    });

    return muscleCard;
}

function updateOrderIndexes() {
    const gridItems = document.querySelectorAll(".grid-item");
    gridItems.forEach((item, index) => {
        item.dataset.index = index + 1;
        const orderIndexDisplay = item.querySelector(".order-index");
        if (orderIndexDisplay) {
            orderIndexDisplay.textContent = index + 1;
        }
    });
}

Telegram.WebApp.onEvent("mainButtonClicked", function() {
            const selectedExercises = selectedIds.map((id, index) => ({ id, orderIndex: index + 1 }));
            tg.sendData(JSON.stringify({
                result: selectedExercises,
                group: mGroup
            }));
            tg.close();
});