let tg = window.Telegram.WebApp;

tg.expand();
tg.MainButton.text = "Save and Send";
tg.MainButton.show();

const muscleGrid = document.getElementById("muscles");

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

        if (jsonArray.selected) {
            muscleGrid.appendChild(createMuscleCard(jsonArray.selected));
            makeGridItemsDraggable();
        } else {
            tg.MainButton.hide();
            const muscleCard = document.createElement("div");
            muscleCard.innerHTML = `No exercises selected`;
            muscleGrid.appendChild(muscleCard);
        }
    } else {
        tg.MainButton.hide();
        const muscleCard = document.createElement("div");
        muscleCard.innerHTML = `No exercises selected`;
        muscleGrid.appendChild(muscleCard);
    }
});

function makeGridItemsDraggable() {
    const gridItems = document.querySelectorAll('.grid-item');

    gridItems.forEach((item) => {
        item.draggable = true;

        item.addEventListener('dragstart', function (event) {
            event.dataTransfer.setData('text/plain', item.dataset.index);
        });

        item.addEventListener('dragover', function (event) {
            event.preventDefault();
            const draggedIndex = parseInt(event.dataTransfer.getData('text/plain'));
            const currentIndex = parseInt(item.dataset.index);

            if (draggedIndex < currentIndex) {
                item.style.borderTop = '2px solid #2196F3';
                item.style.borderBottom = '';
            } else if (draggedIndex > currentIndex) {
                item.style.borderBottom = '2px solid #2196F3';
                item.style.borderTop = '';
            }
        });

        item.addEventListener('dragleave', function () {
            item.style.borderTop = '';
            item.style.borderBottom = '';
        });

        item.addEventListener('drop', function (event) {
            event.preventDefault();
            const draggedIndex = parseInt(event.dataTransfer.getData('text/plain'));
            const currentIndex = parseInt(item.dataset.index);
            const gridItems = document.querySelectorAll('.grid-item');

            const draggedElement = document.querySelector(`[data-index="${draggedIndex}"]`);
            const parent = item.parentNode;

            parent.insertBefore(draggedElement, item);

            updateOrderIndexes();

            gridItems.forEach((gridItem) => {
                gridItem.style.borderTop = '';
                gridItem.style.borderBottom = '';
            });
        });


    });

    // Add touch events for mobile devices
    gridItems.forEach((item) => {
        let draggedIndex;

        item.addEventListener('touchstart', function (event) {
            draggedIndex = parseInt(item.dataset.index);
        });

        item.addEventListener('touchmove', function (event) {
            event.preventDefault();
        });

        item.addEventListener('touchend', function (event) {
            const currentIndex = parseInt(item.dataset.index);
            const gridItems = document.querySelectorAll('.grid-item');

            gridItems.forEach((gridItem) => {
                gridItem.style.borderTop = '';
                gridItem.style.borderBottom = '';
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
    const muscleCard = document.createElement('div');
    muscleCard.classList.add('grid-container', 'col-lg-4', 'col-sm-12', 'mb-2');

    let orderIndex = 1;

    elements.forEach((element) => {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridItem.dataset.index = orderIndex;
        gridItem.innerHTML = `
            <div class="card" draggable="true">
                <div class="card-post__image" style="background-image: url('https://bodyboots.surge.sh/${element}.gif'); position: relative; border-bottom-left-radius: 0.625rem; border-bottom-right-radius: 0.625rem;">
                </div>
            </div>`;

        muscleCard.appendChild(gridItem);
        orderIndex++;
    });

    return muscleCard;
}

function updateOrderIndexes() {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach((item, index) => {
        item.dataset.index = index + 1;
    });
}

Telegram.WebApp.onEvent('mainButtonClicked', function () {
    const selectedExercises = Array.from(document.querySelectorAll('.grid-item')).map((item, index) => {
        return {
            id: item.dataset.index,
            orderIndex: index + 1
        };
    });

    tg.sendData(JSON.stringify({
        result: selectedExercises
    }));

    tg.close();
});
