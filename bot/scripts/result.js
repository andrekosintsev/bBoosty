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
        makeGridItemsDraggable();
    }
});

function makeGridItemsDraggable() {
    const gridItems = document.querySelectorAll(".grid-item");

    gridItems.forEach((item) => {
        item.draggable = true;

        item.addEventListener("dragstart", function (event) {
            event.dataTransfer.setData("text/plain", item.dataset.index);
            // Add a class to the dragged item for styling during the drag operation
            item.classList.add("dragged-item");
        });

        item.addEventListener("dragover", function (event) {
            event.preventDefault();
            const draggedIndex = parseInt(event.dataTransfer.getData("text/plain"));
            const currentIndex = parseInt(item.dataset.index);

            if (draggedIndex < currentIndex) {
                item.style.borderTop = "2px solid #2196F3";
                item.style.borderBottom = "";
            } else if (draggedIndex > currentIndex) {
                item.style.borderBottom = "2px solid #2196F3";
                item.style.borderTop = "";
            }
        });

        item.addEventListener("dragleave", function () {
            item.style.borderTop = "";
            item.style.borderBottom = "";
        });

        item.addEventListener("drop", function (event) {
            event.preventDefault();
            const draggedIndex = parseInt(event.dataTransfer.getData("text/plain"));
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

        // Remove the drag styling when the drag operation ends
        item.addEventListener("dragend", function () {
            item.style.borderTop = "";
            item.style.borderBottom = "";
            item.classList.remove("dragged-item");
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